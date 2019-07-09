import Matrix from './Matrix.js';
import Utils from './Utils.js';

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
            rotations: {
                x: {
                    MRotation: null,
                    MInverse: null,
                    MReverse: null
                },
                y: {
                    MRotation: null,
                    MInverse: null,
                    MReverse: null
                },
                z: {
                    MRotation: null,
                    MInverse: null,
                    MReverse: null
                }
            }
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

    rotate(axis, alpha, pointAround = this.position) {
        let axisTRot = this.transforms.rotations[axis];

        if (alpha !== 0) {
            alpha = Utils.degToRad(alpha);

            switch (axis) {
                case 'x':
                    /*
                        1, 0,      0,       0
                        0, cos(a), -sin(a), 0
                        0, sin(a), cos(a),  0
                        0, 0,      0,       1
                    */
                    axisTRot.MRotation = new Matrix();
                    axisTRot.MRotation.setValue(1, 1, Math.cos(alpha));
                    axisTRot.MRotation.setValue(1, 2, -Math.sin(alpha));
                    axisTRot.MRotation.setValue(2, 1, Math.sin(alpha));
                    axisTRot.MRotation.setValue(2, 2, Math.cos(alpha));
                    break;

                case 'y':
                    /*
                        cos(a),  0, sin(a), 0
                        0,       0, 0     , 0
                        0,       0, 0     , 0
                        -sin(1), 0, cos(a), 1
                    */
                    axisTRot.MRotation = new Matrix();
                    axisTRot.MRotation.setValue(0, 0, Math.cos(alpha));
                    axisTRot.MRotation.setValue(2, 0, -Math.sin(alpha));
                    axisTRot.MRotation.setValue(0, 2, Math.sin(alpha));
                    axisTRot.MRotation.setValue(2, 2, Math.cos(alpha));
                    break;

                case 'z':
                    /*
                        cos(a), -sin(a), 0, 0
                        sin(a), cos(a),  0, 0
                        0,      0,       1, 0
                        0,      0,       0, 1
                    */
                    axisTRot.MRotation = new Matrix();
                    axisTRot.MRotation.setValue(0, 0, Math.cos(alpha));
                    axisTRot.MRotation.setValue(0, 1, -Math.sin(alpha));
                    axisTRot.MRotation.setValue(1, 0, Math.sin(alpha));
                    axisTRot.MRotation.setValue(1, 1, Math.cos(alpha));
                    break;
            }
            
            
            axisTRot.MInverse = new Matrix();
            axisTRot.MInverse.setValue(0, 3, -pointAround.getX()),
            axisTRot.MInverse.setValue(1, 3, -pointAround.getY());
            axisTRot.MInverse.setValue(2, 3, -pointAround.getZ());

            axisTRot.MReverse = new Matrix();
            axisTRot.MReverse.setValue(0, 3, pointAround.getX()),
            axisTRot.MReverse.setValue(1, 3, pointAround.getY());
            axisTRot.MReverse.setValue(2, 3, pointAround.getZ());
        } else {
            axisTRot.MRotation = null;
        }
        return this;
    }
}

export default Object3D;