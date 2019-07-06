import Point from './Point.js';
import Matrix from './Matrix.js';

class Camera {

    constructor(config) {
        this.id = config.id;
        this.position = new Point(0, 0, 0),
            this.matrix = new Matrix();
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

export default Camera;