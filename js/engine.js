class Matrix {
    constructor(size = 4) {
        // Create the identity matrix by default
        this.values = [];
        this.size   = 4;
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                row.push(j === i ? 1 : 0);
            }
            this.values.push(row);
        }
    }
    getSize() {
        return this.size;
    }
    get() {
        return this.values;
    }
    getValue(row, col) {
        return this.values[row][col];
    }
    setValue(row, col, value) {
        this.values[row][col] = value;
        return this;
    }
    static multiply(m1, m2) {
        let size = m1.getSize();
        let m    = new Matrix(size);
        
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let sum = 0;
                for (let k = 0; k < size; k++) {
                    sum += m1.getValue(i, k) * m2.getValue(j, k);
                }
                m.setValue(i, j, sum);
            }
        }
        return m;
    }
}

class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    setCoords(x, y, z) {
        this.x = x;
        this.y = y; 
        this.z = z;
        return this;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getZ() {
        return this.z;
    }
    static substract(p1, p2) {
        return new Point(p2.getX() - p1.getX(), p2.getY() - p1.getY(), p2.getZ() - p1.getZ());
    }
    static multiply(p1, v) {
        return new Point(p1.getX() * v, p1.getY() * v, p1.getZ() * v)
    }
    static dotProduct(p1, p2) {
        return new Point(
            p1.getY() * p2.getZ() - p1.getZ() * p2.getY(),
            p1.getZ() * p2.getX() - p1.getX() * p2.getZ(),
            p1.getX() * p2.getY() - p1.getY() * p2.getX()
        )
    }
    static dot(p1, p2) {
        return p1.getX() * p2.getX() + p1.getY() * p2.getY() + p1.getZ() * p2.getZ()
    }
    static length(p) {
        return Math.sqrt(this.dot(p, p));
    }
    static normalize(p) {
        let m = this.length(p);
        if (m > 0) {
            return new Point(p.getX() / m, p.getY() / m, p.getZ() / m);
        } else {
            return p;
        }
    }
}

class Poligon {
    constructor(indexs = []) {
        this.indexs = indexs;
    }
    getIndexs() {
        return this.indexs;
    }
}

class Geometry {
    constructor() {
        this.points = [];
        this.poligons = [];
    }
    addPoint(point) {
        this.points.push(point);
        return this;
    }
    getPoints() {
        return this.points;
    }
    addPoligon(poligon) {
        this.poligons.push(poligon);
        return this;
    }
    getPoligons() {
        return this.poligons;
    }
}

class Cube extends Geometry {
    /*
        5________4
       / |      /|
      0________1 |
      |  6_____|_7
      | /      | /
      3________2/
    */
    constructor(size) {
        super();
        this.addPoint(new Point(0, 0, 0));
        this.addPoint(new Point(size, 0, 0));
        this.addPoint(new Point(size, size, 0));
        this.addPoint(new Point(0, size, 0));
        this.addPoint(new Point(size, 0, size));
        this.addPoint(new Point(0, 0, size));
        this.addPoint(new Point(0, size, size));
        this.addPoint(new Point(size, size, size));

        this.addPoligon(new Poligon([0, 1, 2, 3]));
        this.addPoligon(new Poligon([0, 3, 6, 5]));
        this.addPoligon(new Poligon([4, 5, 6, 7]));
        this.addPoligon(new Poligon([1, 4, 7, 2]));
        this.addPoligon(new Poligon([5, 4, 1, 0]));
        this.addPoligon(new Poligon([3, 2, 7, 6]));
    }
}

class Plane extends Geometry {
    constructor(size) {
        super();
        this.addPoint(new Point(0, 0, 0));
        this.addPoint(new Point(0, 0, size));
        this.addPoint(new Point(size, 0, size));
        this.addPoint(new Point(size, 0, 0));

        this.addPoligon(new Poligon([0, 1, 2, 3]));
    }
}

class Sphere extends Geometry {
    constructor(radius, space) {
        super();
        let index    = 0;
        let startInd = 0;

        this.addPoint(new Point(0, 0, radius));
        
        for (let j = 0; j < 360 / space - 1; j++) {
            this.addPoligon(new Poligon([0, index + 1, index + 2]));
            index++;
        }

        this.addPoligon(new Poligon([0, index + 1, 1]));

        index = 1;

        for (let i = 0, b = space; i < 180 / space - 1; i++, b += space) {
            //Assign our a loop to go through 360 degrees in intervals of our variable space
            for (let j = 0, a = 0; j < 360 / space; j++, a += space) {
                if (j === 0) {
                    startInd = index;
                }
                this.addPoint(new Point(
                    radius * Math.sin(a / 180 * Math.PI) * Math.sin(b / 180 * Math.PI),
                    radius * Math.cos(a / 180 * Math.PI) * Math.sin(b / 180 * Math.PI),
                    radius * Math.cos(b / 180 * Math.PI)
                ));

                if (i > 0) {
                    if (j < 360 / space -1){
                        this.addPoligon(new Poligon([
                            index,
                            index + 360 / space,
                            index + 360 / space + 1,
                            index + 1
                        ]));
                    } else {
                        this.addPoligon(new Poligon([
                            index,
                            index + 360 / space,
                            startInd + 360 / space,
                            startInd
                        ]));
                    }
                    index++;
                }
            }
        }

        this.addPoint(new Point(0, 0, -radius));

        index = this.getPoints().length - 1;
        startInd = index;
        
        for (let j = 0; j < 360 / space - 1; j++) {
            this.addPoligon(new Poligon([startInd, index - 1, index - 2]));
            index--;
        }

        this.addPoligon(new Poligon([startInd, index - 1, startInd - 1]));
    }
}

class Object3D {
    constructor(config) {
        this.id         = config.id;
        this.geometry   = config.geometry;
        this.position   = config.position;
        this.transforms = []
        this.options    = Object.assign({
            drawPoints: false
        }, config.options);
    }
    getId() {
        return this.id;
    }
    getPosition() {
        return this.position;
    }
    getGeometry() {
        return this.geometry;
    }
    getOptions() {
        return this.options;
    }
    setOptions(options) {
        this.options = Object.assign(this.options, options);
        return this;
    }
}

class Scene {
    constructor(config) {
        this.id      = config.id;
        this.name    = config.name;
        this.camera  = config.camera;
        this.objects = {};
    }
    addObject(obj) {
        this.objects[obj.id] = obj;
        return this;
    }
    removeObject(objectId) {
        delete this.objects[objectId];
        return this;
    }
    getObject(objectId) {
        return this.objects[objectId];
    }
    getObjects() {
        return this.objects;
    }
    getCamera() {
        return this.camera;
    }
}

class Camera {
    constructor(config) {
        this.id       = config.id;
        this.position = config.position;
    }
    getId() {
        return this.id;
    }
    getPosition() {
        return this.position;
    }
    setPosition(position) {
        this.position = position;
        return this;
    }
}

class Engine {
    constructor(config = {}) {
        this.config = Object.assign({
            drawPoints: false
        }, config);
        this.canvas = this.config.canvas;
        this.ctx    = canvas.getContext('2d');
        this.scenes = {};
    }

    renderLoop(objects, camera) {
        this.clearCanvas();
        Object.keys(objects).forEach(key => {
            this.drawObject(objects[key], camera);
        });
    }

    addScene(scene) {
        this.scenes[scene.id] = scene;
        return this;
    }

    renderScene(sceneId) {
        let scene   = this.scenes[sceneId];
        let objects = scene.getObjects();
        let camera  = scene.getCamera();

        this.renderLoop(objects, camera);
        setInterval(e => {
            this.renderLoop(objects, camera);
        }, 1000);
        return this;
    }

    projection (coord, z) {
        return (coord * 500) / (z + 500);
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawPoint(point, origin = new Point(0, 0, 0), camera, text = false) {
        let camPosition = camera.getPosition();
        let x = this.projection(point.getX() + origin.getX(), point.getZ() + origin.getZ() - camPosition.getZ()) + camPosition.getX();
        let y = this.projection(point.getY() + origin.getY(), point.getZ() + origin.getZ() - camPosition.getZ()) + camPosition.getY();

        this.ctx.beginPath();
        this.ctx.arc(x, y, 4, 0, Math.PI * 2, true);
        this.ctx.stroke();

        if (text !== false) {
            this.ctx.font = '10px Verdana';
            this.ctx.strokeText(text, x + 4, y - 4);
        }
        return this;
    }

    drawPoligonNormal(poligon, points, origin, camera) {
        let indexs  = poligon.getIndexs();
        let p0      = points[indexs[0]];
        let p1      = points[indexs[1]];
        let p2      = points[indexs[2]];
        let ab1     = Point.substract(p1, p0);
        let ab2     = Point.substract(p1, p2);
        let ab1xab2 = Point.dotProduct(ab1, ab2);
        let pDir    = Point.multiply(Point.normalize(ab1xab2), 30);
        let camPosition = camera.getPosition();
        
        this.ctx.beginPath();
        this.ctx.moveTo(
            this.projection(p1.getX() + origin.getX(), p1.getZ() + origin.getZ() - camPosition.getZ()) + camPosition.getX(),
            this.projection(p1.getY() + origin.getY(), p1.getZ() + origin.getZ() - camPosition.getZ()) + camPosition.getY()
        );
        this.ctx.strokeStyle = '#FF0000';
        this.ctx.lineTo(
            this.projection(p1.getX() + pDir.getX() + origin.getX(), p1.getZ() + pDir.getZ() + origin.getZ() - camPosition.getZ()) + camPosition.getX(),
            this.projection(p1.getY() + pDir.getY() + origin.getY(), p1.getZ() + pDir.getZ() + origin.getZ() - camPosition.getZ()) + camPosition.getY()
        );
        this.ctx.stroke();
        this.ctx.strokeStyle = '#000000';
    }

    drawPoligon(poligon, points, origin = new Point(0, 0, 0), camera, drawPoints = false, drawNormals = false) {
        let indexs      = poligon.getIndexs();
        let numindexs   = indexs.length;
        let camPosition = camera.getPosition();
        let p0          = points[indexs[0]];
        let p1          = points[indexs[1]];
        let p2          = points[indexs[2]];

        if (this.isVisible(p2, p1, p0, origin, camPosition)) {
            this.ctx.beginPath();
            this.ctx.moveTo(
                this.projection(p0.getX() + origin.getX(), p0.getZ() + origin.getZ() - camPosition.getZ()) + camPosition.getX(),
                this.projection(p0.getY() + origin.getY(), p0.getZ() + origin.getZ() - camPosition.getZ()) + camPosition.getY()
            );

            for (let i = 1; i < numindexs; i++) {
                let p = points[indexs[i]];
                this.ctx.lineTo(
                    this.projection(p.getX() + origin.getX(), p.getZ() + origin.getZ() - camPosition.getZ()) + camPosition.getX(),
                    this.projection(p.getY() + origin.getY(), p.getZ() + origin.getZ() - camPosition.getZ()) + camPosition.getY()
                );
            }

            this.ctx.lineTo(
                this.projection(p0.getX() + origin.getX(), p0.getZ() + origin.getZ() - camPosition.getZ()) + camPosition.getX(),
                this.projection(p0.getY() + origin.getY(), p0.getZ() + origin.getZ() - camPosition.getZ()) + camPosition.getY()
            );
            this.ctx.closePath();
            this.ctx.stroke();

            if (drawNormals) {
                this.drawPoligonNormal(poligon, points, origin, camera);
            }

            if (drawPoints || this.config.drawPoints) {
                points.forEach((p, i) => {
                    this.drawPoint(p, origin, camera, i);
                });
            }
        }
        return this;
    }

    isVisible(p1, p2, p3, origin, camPosition) {
        // @todo check poligon visibility
        return true;
    }

    drawObject(object, camera) {
        let pos        = object.getPosition();
        let options    = object.getOptions();
        let geometry   = object.getGeometry();
        let poligons   = geometry.getPoligons();
        let points     = geometry.getPoints();

        poligons.forEach(p => {
            this.drawPoligon(p, points, pos, camera, options.drawPoints, options.drawNormals);
        });
        return this;
    }
}