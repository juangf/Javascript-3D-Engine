import Scene from "../engine/Scene.js";
import Object3D from "../engine/Object3D.js";
import Point from "../engine/Point.js";
import PyramidSquare from "../figures/PyramidSquare.js";

class PyramidScene extends Scene {
    constructor(camera) {
        super({
            id: 'pyramid_scene',
            name: 'Pyramid',
            camera: camera,
        });

        this
            .addObject(new Object3D({
                id: 'pyramid_square_1',
                position: new Point(-110, 80, 90),
                geometry: new PyramidSquare(100, 100, 100),
                options: {
                    drawPoints: true,
                    drawNormals: true
                }
            }))
            .addObject(new Object3D({
                id: 'pyramid_square_2',
                position: new Point(110, 80, 90),
                geometry: new PyramidSquare(100, 100, 100),
                options: {
                    drawPoints: true,
                    drawNormals: true
                }
            }));
    }

}

export default PyramidScene;