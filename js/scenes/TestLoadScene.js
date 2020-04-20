import Scene from "../engine/Scene.js";
import Point from "../engine/Point.js";
import SpotLight from "../engine/Light/SpotLight.js";

// Objects.
import Generate from '../engine/reader/Generate.js';

/**
 * Scene with a castle.
 */
class TestLoadScene extends Scene {
    constructor() {
        super({
            id: 'test_load_obj',
            name: 'load_obj'
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
        this.addLight(new SpotLight({
            id: 'light1',
            position: new Point(0, 500, 0)
        }));
    }
}

export default TestLoadScene;