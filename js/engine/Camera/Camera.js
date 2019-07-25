import Point from '../Point.js';
import Matrix from '../Matrix.js';

class Camera {

    constructor(config) {
        this.id = config.id;
        this.position = new Point(0, 190, -500);
        this.up       = new Point(0, 1, 0);
        this.front    = new Point(0, 0, 1);
        this.far      = 5000;
        this.near     = -650;

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
        return this;
    }

    getMatrix() {
        return new Matrix();
    }

    getFar() {
        return this.far;
    }

    getNear() {
        return this.near;
    }
}

export default Camera;