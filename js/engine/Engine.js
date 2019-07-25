import Matrix from './Matrix.js';
import Point from './Point.js';
import Scene from "./Scene.js";
import Utils from './Utils.js';
class Engine {

    constructor(config = {}) {
        this.config = Object.assign({
            drawPoints: false
        }, config);
        this.canvas = this.config.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.scenes = {};
        this.currentScene = null;
        this.requestAfRef = null;
        this.worldMatrix = new Matrix([
            [1,  0, 0, 0],
            [0,  -1, 0, 0],
            [0,  0, 1, 0],
            [0,  0, 0, 1]
        ]);
    }

    renderLoop(objects, camera) {
        this.clearCanvas();
        this.scenes[this.currentScene].beforeRender();
        Object.keys(objects).forEach(key => {
            this.drawObject(objects[key], camera);
        });
        this.requestAfRef = requestAnimationFrame(timestamp => {
            this.renderLoop(objects, camera);
        });
        return this;
    }

    addScene(scene) {
        this.scenes[scene.id] = scene;

        // First scene is the current scene (by default).
        if (Object.keys(this.scenes).length === 1) {
            this.setCurrentScene(scene.id);
        }

        return this;
    }

    renderScene(sceneId) {
        let scene = this.scenes[sceneId];
        let objects = scene.getObjects();
        let camera = scene.getCamera();

        this.renderLoop(objects, camera);

        return this;
    }

    startRender() {
        this.renderScene(this.currentScene);
        return this;
    }

    stopRender() {
        if (this.requestAfRef) {
            cancelAnimationFrame(this.requestAfRef);
            this.requestAfRef = null;
        }
        return this;
    }

    restartRender() {
        this.stopRender();
        this.startRender();
    }

    projection(axis, value, z) {
        return (value * 700) / (z + 700) + (axis === 'x' ? this.canvas.width : this.canvas.height) / 2;
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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

    rotatePointAroundAxis(point, axisRotation) {
        point = Point.multiplyMatrix(point, axisRotation.MInverse);
        point = Point.multiplyMatrix(point, axisRotation.MRotation);
        return Point.multiplyMatrix(point, axisRotation.MReverse);
    }

    drawNormal(indexs, points) {
        let p0 = points[indexs[0]];
        let p1 = points[indexs[1]];
        let p2 = points[indexs[2]];
        let ab1 = Point.substract(p1, p2);
        let ab2 = Point.substract(p1, p0);
        let ab1xab2 = Point.dotProduct(ab1, ab2);
        let pDir = Point.multiply(Point.normalize(ab1xab2), 25);
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
    }

    drawPolygon(camera, polygon, position, points, transforms, transformsMatrix, drawPoints = false, drawNormals = false, backfaceCulling = true) {
        let indexs = polygon.getIndexs();
        let numindexs = indexs.length;
        let transformedPoints = {};

        /**
         * @todo refactorize the transformed points system
         */
        if (backfaceCulling) {
            for (let i = 0; i < 3; i++) {
                let p = Point.add(points[indexs[i]], position);
                p = Point.multiplyMatrix(p, transformsMatrix);
                transformedPoints[indexs[i]] = p;
            }
        }

        if (!backfaceCulling || this.isVisible(transformedPoints[indexs[0]], transformedPoints[indexs[1]], transformedPoints[indexs[2]])) {
            drawPoints = drawPoints || this.config.drawPoints;
            transformedPoints = {};

            for (let i = 0; i < numindexs; i++) {
                let p = Point.add(points[indexs[i]], position);
                p = Point.multiplyMatrix(p, transformsMatrix);

                if (p.getZ() > camera.getFar() || p.getZ() < camera.getNear()) {
                    return this;
                }

                if (i === 0) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(
                        this.projection('x', p.getX(), p.getZ()),
                        this.projection('y', p.getY(), p.getZ())
                    );
                }
                if (drawPoints || drawNormals) {
                    transformedPoints[indexs[i]] = p;
                }

                this.ctx.lineTo(
                    this.projection('x', p.getX(), p.getZ()),
                    this.projection('y', p.getY(), p.getZ())
                );
            }

            this.ctx.closePath();
            this.ctx.stroke();

            if (drawNormals) {
                this.drawNormal(indexs, transformedPoints);
            }

            if (drawPoints) {
                let that = this;
                Object.keys(transformedPoints).forEach(function(key) {
                    that.drawPoint(transformedPoints[key], key);
                });
            }
        }
        return this;
    }

    isVisible(p1, p2, p3) {
        return (
            (this.projection('x', p2.getX(), p2.getZ()) - this.projection('x', p1.getX(), p1.getZ())) * (this.projection('y', p3.getY(), p3.getZ()) - this.projection('y', p1.getY(), p1.getZ())) <
            (this.projection('x', p3.getX(), p3.getZ()) - this.projection('x', p1.getX(), p1.getZ())) * (this.projection('y', p2.getY(), p2.getZ()) - this.projection('y', p1.getY(), p1.getZ()))
        );
    }

    drawObject(object, camera) {
        let pos = object.getPosition();
        let options = object.getOptions();
        let geometry = object.getGeometry();
        let polygons = geometry.getPolygon();
        let points = geometry.getPoints();
        let transforms = object.getTransforms();

        // Note: TransformedPoint = TranslationMatrix * RotationMatrix * ScaleMatrix * OriginalPoint
        let transformsMatrix = this.worldMatrix;
        let cam = camera.getMatrix();

        transformsMatrix = Matrix.multiply(this.worldMatrix, cam);

        polygons.forEach(p => {
            this.drawPolygon(camera, p, pos, points, transforms, transformsMatrix, options.drawPoints, options.drawNormals, options.backfaceCulling);
        });
        return this;
    }

    setCurrentScene(id) {
        if (this.currentScene !== id && this.scenes[id] instanceof Scene) {
            this.currentScene = id;
            if (this.requestAfRef) {
                this.restartRender();
            }
        }

        return this;
    }
}

export default Engine;