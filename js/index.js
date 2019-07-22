// Core.
import Engine from './engine/Engine.js';
import Point from './engine/Point.js';
import FpCamera from './engine/camera/FpCamera.js';

// Constants.
import {DEFAULT_MOVE_VELOCITY, DEFAULT_CAMERA_POINT} from './engine/Constants.js';
import {KEY_W, KEY_A, KEY_S, KEY_D, KEY_UP, KEY_C, KEY_LEFT, KEY_DOWN, KEY_RIGHT} from './engine/Constants.js';
import {KEY_1, KEY_2, KEY_3, KEY_4} from './engine/Constants.js';

// Scenes.
import DefaultScene from './scenes/DefaultScene.js';
import CastleScene from './scenes/CastleScene.js';
import WavesScene from './scenes/WavesScene.js';
import TestLoadScene from './scenes/TestLoadScene.js';

let cnv = document.getElementById('canvas');

cnv.width = window.innerWidth;
cnv.height = window.innerHeight;

window.eng = new Engine({
    canvas: cnv
});

let cameraPosition = new Point(DEFAULT_CAMERA_POINT.x, DEFAULT_CAMERA_POINT.y, DEFAULT_CAMERA_POINT.z);

let cam = new FpCamera({
    id: 'cam1',
    position: cameraPosition
});

let homeScene = new DefaultScene(cam);
let castleScene = new CastleScene(0, 0, 0, cam);
let wavesScene = new WavesScene(cam);
let testLoadScene = new TestLoadScene(cam);

eng
    .addScene(homeScene)
    .addScene(wavesScene)
    .addScene(testLoadScene)
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
            eng.setCurrentScene(wavesScene.id);
            break;
        case KEY_3:
            eng.setCurrentScene(testLoadScene.id);
            break;
    }
});