class Matrix {
    /*
        1, 0, 0, X
        0, 1, 0, Y
        0, 0, 1, Z
        0, 0, 0, W
    */
    constructor(size = 4, scale = 1) {
        // Create the identity matrix by default
        this.values = [];
        this.size   = 4;
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                row.push(j === i ? scale : 0);
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
    constructor(x, y, z, w = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w; // If the Vector is director, w = 0
    }
    setCoords(x, y, z, w = 1) {
        this.x = x;
        this.y = y; 
        this.z = z;
        this.w = w;
        return this;
    }
    getCoords() {
        return [this.x, this.y, this.z, this.w];
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
    static add(p1, p2) {
        return new Point(p2.getX() + p1.getX(), p2.getY() + p1.getY(), p2.getZ() + p1.getZ());
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
    static multiplyMatrix(p, m) {
        let size   = m.getSize();
        let coords = p.getCoords();
        let res    = [0, 0, 0];

        for (let i = 0; i < size; i++) {
            let sum = 0;
            for (let j = 0; j < size; j++) {
                sum += m.getValue(i, j) * coords[j];
            }
            res[i] = sum;
        }

        return new Point(res[0], res[1], res[2], res[3]);
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
        size = size / 2;

        this.addPoint(new Point(-size, -size, -size));
        this.addPoint(new Point(size, -size, -size));
        this.addPoint(new Point(size, size, -size));
        this.addPoint(new Point(-size, size, -size));
        this.addPoint(new Point(size, -size, size));
        this.addPoint(new Point(-size, -size, size));
        this.addPoint(new Point(-size, size, size));
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
        this.options    = Object.assign({
            drawPoints: false
        }, config.options);
        this.transforms = {
            translation : new Matrix(),
            scale       : new Matrix(),
            rotation    : new Matrix()
        }
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
    getTransforms() {
        return this.transforms;
    }
    scale(value) {
        this.transforms.scale = new Matrix(4, value);
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
        this.position = new Point(0, 0, 0),
        this.matrix   = new Matrix();
        if (config.position) {
            this.setPosition(config.position);
        }
    }
    getId() {
        return this.id;
    }
    getPosition() {
        return this.position;
    }
    setPosition(p) {
        this.position = p;
        this.matrix.setValue(0, 3, p.getX());
        this.matrix.setValue(1, 3, p.getY());
        this.matrix.setValue(2, 3, p.getZ());
        return this;
    }
    getMatrix() {
        return this.matrix;
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

    projection (axis, value, z) {
        return (value * 500) / (z + 500) + (axis === 'x' ? this.canvas.width : this.canvas.height) / 2;
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawPoint(point, position, transformsMatrix, text = false) {
        let p = Point.multiplyMatrix(Point.add(point, position), transformsMatrix);
        let x = this.projection('x', p.getX(), p.getZ());
        let y = this.projection('y', p.getY(), p.getZ());
        
        this.ctx.beginPath();
        this.ctx.arc(x, y, 4, 0, Math.PI * 2, true);
        this.ctx.stroke();

        if (text !== false) {
            this.ctx.font = '10px Verdana';
            this.ctx.strokeText(text, x + 4, y - 4);
        }
        return this;
    }

    drawPoligonNormal(poligon, position, points, transformsMatrix) {
        let indexs  = poligon.getIndexs();
        let p0      = points[indexs[0]];
        let p1      = points[indexs[1]];
        let p2      = points[indexs[2]];
        let ab1     = Point.substract(p1, p0);
        let ab2     = Point.substract(p1, p2);
        let ab1xab2 = Point.dotProduct(ab1, ab2);
        let pDir    = Point.multiply(Point.normalize(ab1xab2), 25);
        let p       = Point.multiplyMatrix(Point.add(p1, position), transformsMatrix);

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

    drawPoligon(poligon, position, points, transformsMatrix, drawPoints = false, drawNormals = false) {
        let indexs    = poligon.getIndexs();
        let numindexs = indexs.length;
        let p0        = points[indexs[0]];

        if (this.isVisible(poligon, transformsMatrix)) {
            let p = Point.multiplyMatrix(Point.add(p0, position), transformsMatrix);
            this.ctx.beginPath();
            this.ctx.moveTo(
                this.projection('x', p.getX(), p.getZ()),
                this.projection('y', p.getY(), p.getZ())
            );

            for (let i = 1; i < numindexs; i++) {
                let p = Point.multiplyMatrix(Point.add(points[indexs[i]], position), transformsMatrix);
                this.ctx.lineTo(
                    this.projection('x', p.getX(), p.getZ()),
                    this.projection('y', p.getY(), p.getZ())
                );
            }

            this.ctx.lineTo(
                this.projection('x', p.getX(), p.getZ()),
                this.projection('y', p.getY(), p.getZ())
            );
            this.ctx.closePath();
            this.ctx.stroke();

            if (drawNormals) {
                this.drawPoligonNormal(poligon, position, points, transformsMatrix);
            }

            if (drawPoints || this.config.drawPoints) {
                points.forEach((p, i) => {
                    this.drawPoint(p, position, transformsMatrix, i);
                });
            }
        }
        return this;
    }

    isVisible(poligon, camera) {
        // @todo check poligon visibility
        return true;
    }

    drawObject(object, camera) {
        let pos        = object.getPosition();
        let options    = object.getOptions();
        let geometry   = object.getGeometry();
        let poligons   = geometry.getPoligons();
        let points     = geometry.getPoints();
        let transforms = object.getTransforms();

        // Note: TransformedPoint = TranslationMatrix * RotationMatrix * ScaleMatrix * OriginalPoint
        let transformsMatrix = Matrix.multiply(camera.getMatrix(), transforms.scale);

        poligons.forEach(p => {
            this.drawPoligon(p, pos, points, transformsMatrix, options.drawPoints, options.drawNormals);
        });
        return this;
    }
}