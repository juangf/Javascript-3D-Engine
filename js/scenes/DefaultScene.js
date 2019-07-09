import Scene from "../engine/Scene.js";
import Object3D from "../engine/Object3D.js";
import Point from "../engine/Point.js";
import Cube from "../figures/Cube.js";
import Plane from "../figures/Plane.js";
import Sphere from "../figures/Sphere.js";
import PyramidSquare from "../figures/PyramidSquare.js";

class DefaultScene extends Scene
{
    constructor(camera) {
        super({
            id: 'scn1',
            name: 'Testing Scene',
            camera: camera,
        });

        this
            .addObject(new Object3D({
                id: 'cube1',
                position: new Point(130, 100, 0),
                geometry: new Cube(100),
                options: {
                    drawPoints: true,
                    drawNormals: true
                }
            }))
            .addObject(new Object3D({
                id: 'cube2',
                position: new Point(20, 30, 0),
                geometry: new Cube(50),
                options: {
                    drawPoints: false
                }
            }))
            .addObject(new Object3D({
                id: 'cube3',
                position: new Point(-200, -130, 0),
                geometry: new Cube(70),
                options: {
                    drawNormals: true
                }
            }))
            .addObject(new Object3D({
                id: 'plane1',
                position: new Point(-260, 200, 0),
                geometry: new Plane(250),
                options: {
                    drawPoints: true,
                    drawNormals: true
                }
            }))
            .addObject(new Object3D({
                id: 'plane2',
                position: new Point(-100, -240, 0),
                geometry: new Plane(150, 5)
            }))
            .addObject(new Object3D({
                id: 'sphere1',
                position: new Point(140, -100, 0),
                geometry: new Sphere(50, 20),
                options: {
                    drawNormals: true
                }
            }))
            .addObject(new Object3D({
                id: 'sphere2',
                position: new Point(-180, 10, 0),
                geometry: new Sphere(24, 30)
            }))
            .addObject(new Object3D({
                id: 'pyramid_square',
                position: new Point(-110, 80, 90),
                geometry: new PyramidSquare(100, 100, 100),
                options: {
                    drawPoints: true,
                    drawNormals: true
                }
            }));
        
        this.alpha = 0;
    }
    beforeRender() {
        this.objects['cube1']
            .rotate('x', this.alpha)
            .rotate('y', this.alpha)
            .rotate('z', this.alpha);

        if (this.alpha < 360) {
            this.alpha += 2;
        } else {
            this.alpha = 0;
        }

        this.objects['cube3'].rotate('y', this.alpha, new Point(0, 0, 0));
        return this;
    }
}

export default DefaultScene;