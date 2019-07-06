import Matrix from './Matrix.js';

class Object3D {

    constructor(config) {
        this.id = config.id;
        this.geometry = config.geometry;
        this.position = config.position;
        this.options = Object.assign({
            drawPoints: false
        }, config.options);
        this.transforms = {
            translation: new Matrix(),
            scale: new Matrix(),
            rotation: new Matrix()
        };
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

export default Object3D;