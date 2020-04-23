import Scene from "../engine/Scene.js";
import Object3D from "../engine/Object3D.js";
import Point from "../engine/Point.js";
import Sphere from "../geometries/Sphere.js";
import SpotLight from "../engine/Light/SpotLight.js";

/**
 * Scene with spheres.
 */
class SpheresScene extends Scene {

    /**
     * Constructor
     *
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {Camera} camera
     * @param {object} options
     */
    constructor() {
        super({
            id: 'spheres_scene',
            name: 'Spheres'
        });

        this
        .addObject(new Object3D({
            id: 'sphere1',
            position: new Point(250, 400, -200),
            geometry: new Sphere(200, 18),
            options: {
                rgbaColor: {
                    r: 100,
                    g: 10,
                    b: 131,
                    a: 1
                },
                drawNormals: true
            }
        }))
        .addObject(new Object3D({
            id: 'sphere2',
            position: new Point(-250, 400, -200),
            geometry: new Sphere(200, 30),
            options: {
                rgbaColor: {
                    r: 100,
                    g: 130,
                    b: 1,
                    a: 1
                },
                drawNormals: true
            }
        }))
        .addLight(new SpotLight({
            id: 'light1',
            position: new Point(0, 600, -500)
        }))

        return this;
    }

}

export default SpheresScene;