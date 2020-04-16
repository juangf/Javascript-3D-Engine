import Sphere from "../../geometries/Sphere.js";
import Object3D from "../../engine/Object3D.js";

class SpotLight {
    constructor(config) {
        this.id = config.id;
        this.position = config.position;
        this.options = Object.assign({
            rgbaColor: {
                r: 255,
                g: 255,
                b: 255,
                a: 0.1
            },
        }, config.options);
        this.object = new Object3D({
            id: 'spotLight_Sphere_' + this.id,
            position: this.position,
            geometry: new Sphere(12, 40),
            options: {
                rgbaColor: {
                    r: 255,
                    g: 255,
                    b: 255,
                    a: 1
                },
            }
        });
    }

    getObjects() {
        return [this.object];
    }

    getPosition() {
        return this.position;
    }

    setPosition(p) {
        this.position = p;
        if (this.object) {
            this.object.setPosition(p);
        }
        return this;
    }

    getOptions() {
        return this.options;
    }
}

export default SpotLight;