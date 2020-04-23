import Scene from "../engine/Scene.js";
import Object3D from "../engine/Object3D.js";
import Point from "../engine/Point.js";
import Utils from "../engine/Utils.js";
import Plane from "../geometries/Plane.js";
import SpotLight from "../engine/Light/SpotLight.js";

/**
 * Scene with a castle.
 */
class WavesScene extends Scene {
    constructor() {
        super({
            id: 'waves',
            name: 'Waves'
        });

        this.spaces = 30;
        
        let size = 1550;

        this.addObject(new Object3D({
            id: 'plane1',
            position: new Point(-size / 2, 200, -1500),
            geometry: new Plane(size, this.spaces),
            options: {
                rgbaColor: {
                    r: 100,
                    g: 100,
                    b: 255,
                    a: 1
                },
                drawPoints: false,
                drawNormals: false
            }
        }))
        .addLight(new SpotLight({
            id: 'light1',
            position: new Point(0, 300, -800),
            options: {
                rgbaColor: {
                    r: 255,
                    g: 255,
                    b: 255,
                    a: 0.3
                }
            }
        }));
        
        this.alpha = 0;
        let obj = this.getObject('plane1');
        this.points = obj.getGeometry().getPoints();
        
        obj.rotate('y', 90, new Point(0, 200, size / 2)) 
    }
    beforeRender() {
        if (this.alpha > 360) {
            this.alpha -= 360;
        } else {
            this.alpha += 4;
        }
        
        for (let i = 0; i <= this.spaces; i++) {
            for (let j = 0; j <= this.spaces; j++) {    
                let p = this.points[i * (this.spaces + 1) + j];
                p.setCoords(p.getX(), Math.cos(Utils.degToRad(this.alpha - i * 20)) * 50, p.getZ());
            }
        }
    }
}
export default WavesScene;