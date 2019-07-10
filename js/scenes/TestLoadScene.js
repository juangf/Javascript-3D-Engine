import Scene from "../engine/Scene.js";

// Objects.
import Generate from '../engine/reader/Generate.js';

/**
 * Scene with a castle.
 */
class TestLoadScene extends Scene {
    constructor(camera) {
        super({
            id: 'test_load_obj',
            name: 'load_obj',
            camera: camera,
        });
        let cube = new Generate(0, 0, 0, 'resources/obj/cube.obj');
        let diamond = new Generate(150, 150, 150, 'resources/obj/diamond.obj');
        let icosahedron = new Generate(-150, -150, -150, 'resources/obj/icosahedron.obj');
        let teapot = new Generate(-200, 200, -200, 'resources/obj/teapot.obj', 50);
        let shuttle = new Generate(200, 200, -200, 'resources/obj/shuttle.obj', 10);

        this.addObject(cube);
        this.addObject(diamond);
        this.addObject(icosahedron);
        this.addObject(teapot);
        this.addObject(shuttle);
    }
}

export default TestLoadScene;