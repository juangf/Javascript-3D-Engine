import Scene from "../engine/Scene.js";
import Object3D from "../engine/Object3D.js";
import SpotLight from "../engine/Light/SpotLight.js";
import Point from "../engine/Point.js";
import Cube from "../geometries/Cube.js";
import Plane from "../geometries/Plane.js";
import Sphere from "../geometries/Sphere.js";
import PyramidSquare from "../geometries/PyramidSquare.js";
import Cone from "../geometries/Cone.js";
import Generate from '../engine/reader/Generate.js';

class DefaultScene extends Scene
{
    constructor() {
        super({
            id: 'scn1',
            name: 'Testing Scene'
        });

        this
            .addObject(new Object3D({
                id: 'plane1',
                position: new Point(-1000, -50, -500),
                geometry: new Plane(2000, 20),
                options: {
                    rgbaColor: {
                        r: 124,
                        g: 204,
                        b: 39,
                        a: 1
                    },
                    backfaceCulling: false
                }
            }))
            .addObject(new Object3D({
                id: 'cube1',
                position: new Point(0, 150, 300),
                geometry: new Cube(300),
                options: {
                    rgbaColor: {
                        r: 255,
                        g: 131,
                        b: 131,
                        a: 0.5
                    },
                    drawPoints: false,
                    backfaceCulling: true
                }
            }))
            .addObject(new Object3D({
                id: 'sphere1',
                position: new Point(440, 900, 500),
                geometry: new Sphere(200, 20),
                options: {
                    
                }
            }))
            .addObject(new Object3D({
                id: 'sphere2',
                position: new Point(-380, 400, 100),
                geometry: new Sphere(100, 30),
                options: {
                    rgbaColor: {
                        r: 255,
                        g: 0,
                        b: 0,
                        a: 1
                    }
                }
            }))
            .addObject(new Object3D({
                id: 'pyramid_square',
                position: new Point(450, 150, 190),
                geometry: new PyramidSquare(300, 300, 300),
                options: {
                    rgbaColor: {
                        r: 100,
                        g: 100,
                        b: 200,
                        a: 1
                    }
                }
            }))
            .addObject(new Object3D({
                id: 'cone1',
                position: new Point(400, 0, 700),
                geometry: new Cone(200, 600, 20)
            }))
            .addObject(new Object3D({
                id: 'cone2',
                position: new Point(400, 0, -100),
                geometry: new Cone(100, 200, 30)
            }))
            .addLight(new SpotLight({
                id: 'light1',
                position: new Point(0, 100, 100)
            }))
    }
    beforeRender() {
        return this;
    }
}

export default DefaultScene;