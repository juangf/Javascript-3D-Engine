import Scene from "../engine/Scene.js";
import Object3D from "../engine/Object3D.js";
import Point from "../engine/Point.js";
import Utils from "../engine/Utils.js";
import Plane from "../figures/Plane.js";

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
            position: new Point(-size / 2, 200, 0),
            geometry: new Plane(size, this.spaces),
            options: {
                drawPoints: false,
                drawNormals: false
            }
        }))
        this.alpha = 0;
        let obj = this.getObject('plane1');
        this.points = obj.getGeometry().getPoints();
        
        obj.rotate('y', 90, new Point(0, 200, size / 2)) 
    }
    beforeRender() {
        if (this.alpha > 360) {
            this.alpha = 0;
        } else {
            this.alpha += 3;
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