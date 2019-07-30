import Point from './Point.js';
import Matrix from './Matrix.js';
import RenderedPolygon from './RenderedPolygon.js'

class Renderer {
    constructor(canvas, camera, scene) {
        this.canvas = canvas;
        this.camera = camera;
        this.scene = scene
        
        this.ctx = this.canvas.getContext('2d');
        this.worldMatrix = new Matrix([
            [1,  0, 0, 0],
            [0, -1, 0, 0],
            [0,  0, 1, 0],
            [0,  0, 0, 1]
        ]);
    }

    setScene(scene) {
        this.scene = scene;
        return this;
    }

    isVisible(p1, p2, p3) {
        return (
            (this.projection('x', p2.getX(), p2.getZ()) - this.projection('x', p1.getX(), p1.getZ())) * (this.projection('y', p3.getY(), p3.getZ()) - this.projection('y', p1.getY(), p1.getZ())) <
            (this.projection('x', p3.getX(), p3.getZ()) - this.projection('x', p1.getX(), p1.getZ())) * (this.projection('y', p2.getY(), p2.getZ()) - this.projection('y', p1.getY(), p1.getZ()))
        );
    }

    projection(axis, value, z) {
        return (value * 700) / (z + 700) + (axis === 'x' ? this.canvas.width : this.canvas.height) / 2;
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        return this;
    }

    drawPoint(point, text = '') {
        let x = this.projection('x', point.getX(), point.getZ());
        let y = this.projection('y', point.getY(), point.getZ());

        this.ctx.beginPath();
        this.ctx.arc(x, y, 4, 0, Math.PI * 2, true);
        this.ctx.stroke();

        if (text !== '') {
            this.ctx.font = '10px Verdana';
            this.ctx.strokeText(text, x + 4, y - 4);
        }
        return this;
    }

    drawNormal(p0, p1, p2) {
        let ab1 = Point.substract(p1, p2);
        let ab2 = Point.substract(p1, p0);
        let ab1xab2 = Point.dotProduct(ab1, ab2);
        let pDir = Point.multiply(Point.normalize(ab1xab2), 50);
        let p = p1;

        this.ctx.beginPath();
        this.ctx.moveTo(
            this.projection('x', p.getX(), p.getZ()),
            this.projection('y', p.getY(), p.getZ())
        );
        this.ctx.strokeStyle = '#FF0000';
        this.ctx.lineTo(
            this.projection('x', p.getX() + pDir.getX(), p.getZ() + pDir.getZ()),
            this.projection('y', p.getY() + pDir.getY(), p.getZ() + pDir.getZ())
        );
        this.ctx.stroke();
        this.ctx.strokeStyle = '#000000';
        return this;
    }

    drawPolygons(renderedPolygons) {
        renderedPolygons.sort((poly1, poly2) => {
            let points1 = poly1.getPoints();
            let points2 = poly2.getPoints();
            return (points2[0].getZ() + points2[1].getZ() + points2[2].getZ()) / 3 - (points1[0].getZ() + points1[1].getZ()  + points1[2].getZ()) / 3;
        });

        renderedPolygons.forEach(poly => {
            let options = poly.getOptions();
            let points = poly.getPoints();

            points.forEach((p, i) => {
                if (i === 0) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(
                        this.projection('x', p.getX(), p.getZ()),
                        this.projection('y', p.getY(), p.getZ())
                    );
                }
                this.ctx.lineTo(
                    this.projection('x', p.getX(), p.getZ()),
                    this.projection('y', p.getY(), p.getZ())
                );
            });
            this.ctx.closePath();
            this.ctx.stroke();
            this.ctx.fillStyle = '#bbb';
            this.ctx.fill();
            
            if (options.drawPoints) {
                let pointIndexs = poly.getPointIndexs();
                points.forEach((p, i) => {
                    this.drawPoint(p, pointIndexs[i]);
                });
            }
            
            if (options.drawNormals) {
                this.drawNormal(points[0], points[1], points[2]);
            }
        });
        return this;
    }

    renderPolygon(camera, polygon, position, points, transforms, transformsMatrix, options) {
        let indexs = polygon.getIndexs();
        let numindexs = indexs.length;
        let transformedPoints = {};
        let renderedPoly = new RenderedPolygon();

        /**
         * @todo refactorize the transformed points system
         */
        if (options.backfaceCulling) {
            for (let i = 0; i < 3; i++) {
                let p = Point.add(points[indexs[i]], position);
                transformedPoints[indexs[i]] = Point.multiplyMatrix(p, transformsMatrix);
            }
            if (!this.isVisible(transformedPoints[indexs[0]], transformedPoints[indexs[1]], transformedPoints[indexs[2]])) {
                return null;
            }
        }

        for (let i = 0; i < numindexs; i++) {
            let p = Point.add(points[indexs[i]], position);
            p = Point.multiplyMatrix(p, transformsMatrix);

            if (!camera.isPointInViewport(p)) {
                return null;
            }

            renderedPoly.addPoint(p);

            if (options.drawPoints) {
                renderedPoly.addPointIndex(indexs[i]);
            }
        }
        
        return renderedPoly;
    }

    renderObjectPolygons(object, camera) {
        let pos = object.getPosition();
        let options = object.getOptions();
        let geometry = object.getGeometry();
        let polygons = geometry.getPolygon();
        let points = geometry.getPoints();
        let transforms = object.getTransforms();

        // Note: TransformedPoint = TranslationMatrix * RotationMatrix * ScaleMatrix * OriginalPoint
        let transformsMatrix = Matrix.multiply(this.worldMatrix, camera.getMatrix());
        let renderedPolygons = [];

        polygons.forEach(p => {
            let renderedPoly = this.renderPolygon(camera, p, pos, points, transforms, transformsMatrix, options);
            if (renderedPoly) {
                if (options.drawNormals || options.drawPoints) {
                    renderedPoly.setOptions({
                        drawNormals: options.drawNormals,
                        drawPoints: options.drawPoints
                    });
                }
                renderedPolygons.push(renderedPoly);
            }
        });
        
        return renderedPolygons;
    }

    render() {
        this.clearCanvas();
        // Call before render scene method
        this.scene.beforeRender();

        let objects = this.scene.getObjects();

        let renderedPolygons = [];
        Object.keys(objects).forEach(key => {
            renderedPolygons = renderedPolygons.concat(this.renderObjectPolygons(objects[key], this.camera));
        });

        this.drawPolygons(renderedPolygons);
        return this;
    }
}

export default Renderer;