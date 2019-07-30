// Core.
import Renderer from './engine/Renderer.js';
import Point from './engine/Point.js';
import FpCamera from './engine/Camera/FpCamera.js';
import Utils from './engine/Utils.js'

// Constants.
import {DEFAULT_MOVE_VELOCITY, DEFAULT_CAMERA_POINT} from './engine/Constants.js';
import {KEY_W, KEY_A, KEY_S, KEY_D, KEY_UP, KEY_C, KEY_LEFT, KEY_DOWN, KEY_RIGHT} from './engine/Constants.js';
import {KEY_1, KEY_2, KEY_3, KEY_4} from './engine/Constants.js';

// Scenes.
import DefaultScene from './scenes/DefaultScene.js';
import CastleScene from './scenes/CastleScene.js';
import WavesScene from './scenes/WavesScene.js';
import TestLoadScene from './scenes/TestLoadScene.js';

let canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let homeScene = new DefaultScene();
let castleScene = new CastleScene(0, 0, 0);
let wavesScene = new WavesScene();
let testLoadScene = new TestLoadScene();

let cameraPosition = new Point(
    DEFAULT_CAMERA_POINT.x,
    DEFAULT_CAMERA_POINT.y,
    DEFAULT_CAMERA_POINT.z
);

let camera = new FpCamera({
    id: 'cam1',
    position: cameraPosition
});

let renderer = new Renderer(canvas, camera, homeScene);

/*let renderFn = timestamp => {
    requestAnimationFrame(renderFn);
    renderer.render();
};*/
renderer.render();

window.onkeydown = (e => {
    let updateScene = cameraPosition => {
        camera.setPosition(cameraPosition);
        renderer.render();
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
            renderer.setScene(homeScene).render();
            break;
        case KEY_2:
            renderer.setScene(wavesScene).render();
            break;
        case KEY_3:
            renderer.setScene(castleScene).render();
            break;
        case KEY_4:
            renderer.setScene(testLoadScene).render();
            break;
    }
});

document.onmousemove =(e => {
    let posX = e.clientX;
    let posY = e.clientY;
    let percX = posX / window.innerWidth;
    let percY = posY / window.innerHeight;

    let alpha = Utils.degToRad((percX - 0.5) * 360);
    let beta = Utils.degToRad((percY - 0.5) * 360);
    camera.setYaw(alpha);
    camera.setPitch(beta);
    renderer.render();
});