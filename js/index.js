// Core.
import Engine from './engine/Engine.js';
import Point from './engine/Point.js';
import Camera from './engine/Camera.js';

// Constants.
import {DEFAULT_MOVE_VELOCITY, DEFAULT_CAMERA_POINT} from './engine/Constants.js';
import {KEY_W, KEY_A, KEY_S, KEY_D, KEY_UP, KEY_C, KEY_LEFT, KEY_DOWN, KEY_RIGHT} from './engine/Constants.js';
import {KEY_1, KEY_2} from './engine/Constants.js';

// Scenes.
import DefaultScene from './scenes/DefaultScene.js';
import PyramidScene from './scenes/PyramidScene.js';

let cnv = document.getElementById('canvas');

cnv.width = window.innerWidth;
cnv.height = window.innerHeight;

window.eng = new Engine({
    canvas: cnv
});

let cameraPosition = new Point(DEFAULT_CAMERA_POINT.x, DEFAULT_CAMERA_POINT.y, DEFAULT_CAMERA_POINT.z);

let cam = new Camera({
    id: 'cam1',
    position: cameraPosition
});

let homeScene = new DefaultScene(cam);
let pyramidScene = new PyramidScene(cam);

eng
    .addScene(homeScene)
    .addScene(pyramidScene)
    .startRender();

window.onkeydown = (e => {
    let updateScene = cameraPosition => {
        cam.setPosition(cameraPosition);
    };

    switch (e.keyCode) {
        case KEY_LEFT:
        case KEY_A:
            cameraPosition.setCoords(cameraPosition.getX() - DEFAULT_MOVE_VELOCITY, cameraPosition.getY(), cameraPosition.getZ());
            updateScene(cameraPosition);
            break;
        case KEY_RIGHT:
        case KEY_D:
            cameraPosition.setCoords(cameraPosition.getX() + DEFAULT_MOVE_VELOCITY, cameraPosition.getY(), cameraPosition.getZ());
            updateScene(cameraPosition);
            break;
        case KEY_DOWN:
            cameraPosition.setCoords(cameraPosition.getX(), cameraPosition.getY() + DEFAULT_MOVE_VELOCITY, cameraPosition.getZ());
            updateScene(cameraPosition);
            break;
        case KEY_UP:
            cameraPosition.setCoords(cameraPosition.getX(), cameraPosition.getY() - DEFAULT_MOVE_VELOCITY, cameraPosition.getZ());
            updateScene(cameraPosition);
            break;
        case KEY_W:
            cameraPosition.setCoords(cameraPosition.getX(), cameraPosition.getY(), cameraPosition.getZ() - DEFAULT_MOVE_VELOCITY);
            updateScene(cameraPosition);
            break;
        case KEY_S:
            cameraPosition.setCoords(cameraPosition.getX(), cameraPosition.getY(), cameraPosition.getZ() + DEFAULT_MOVE_VELOCITY);
            updateScene(cameraPosition);
            break;
        case KEY_C:
            cameraPosition.setCoords(DEFAULT_CAMERA_POINT.x, DEFAULT_CAMERA_POINT.y, DEFAULT_CAMERA_POINT.z);
            updateScene(cameraPosition);
            break;
        case KEY_1:
            eng.setCurrentScene(homeScene.id);
            break;
        case KEY_2:
            eng.setCurrentScene(pyramidScene.id);
            break;
    }
});

let alpha = 0;
setInterval(e => {
    eng.scenes.scn1.getObjects()['cube1']
        .rotate('x', alpha)
        .rotate('y', alpha)
        .rotate('z', alpha);

    if (alpha < 360) {
        alpha += 3;
    } else {
        alpha = 0;
    }
}, 50);