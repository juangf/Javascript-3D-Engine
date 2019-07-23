import Scene from "../engine/Scene.js";
import Object3D from "../engine/Object3D.js";
import Point from "../engine/Point.js";
import Cube from "../figures/Cube.js";
import Plane from "../figures/Plane.js";
import Sphere from "../figures/Sphere.js";
import PyramidSquare from "../figures/PyramidSquare.js";
import Utils from "../engine/Utils.js";

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
                id: 'plane1',
                position: new Point(-1000, 0, -500),
                geometry: new Plane(2000, 20),
                options: {
                    backfaceCulling: false
                }
            }))
            .addObject(new Object3D({
                id: 'cube1',
                position: new Point(0, 150, 300),
                geometry: new Cube(300),
                options: {
                    drawPoints: true,
                    drawNormals: true
                }
            }))
            .addObject(new Object3D({
                id: 'sphere1',
                position: new Point(440, 900, 500),
                geometry: new Sphere(200, 20),
                options: {
                    drawNormals: true
                }
            }))
            .addObject(new Object3D({
                id: 'sphere2',
                position: new Point(-380, 340, 0),
                geometry: new Sphere(100, 30)
            }))
            .addObject(new Object3D({
                id: 'pyramid_square',
                position: new Point(450, 150, 190),
                geometry: new PyramidSquare(300, 300, 300),
                options: {
                    drawPoints: true,
                    drawNormals: true
                }
            }));
        
        let wWm = window.innerWidth / 2;
        let wHm = window.innerHeight / 2;

        document.onmousemove =(e => {
            let posX = e.clientX;
            let posY = e.clientY;
            let percX = posX / window.innerWidth;
            let percY = posY / window.innerHeight;

            let alpha = Utils.degToRad((percX - 0.5) * 180);
            let beta = Utils.degToRad((percY - 0.5) * 180);
            camera.setYaw(alpha);
            camera.setPitch(beta);
        });
    }
    beforeRender() {
        return this;
    }
}

export default DefaultScene;