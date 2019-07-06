// Core.
import Engine from './engine/Engine.js';
import Object3D from './engine/Object3D.js';
import Point from './engine/Point.js';
import Camera from './engine/Camera.js';
import Scene from './engine/Scene.js';

// Figures.
import PyramidSquare from './figures/PyramidSquare.js';
import Cube from './figures/Cube.js';
import Plane from './figures/Plane.js';
import Sphere from './figures/Sphere.js';

let cnv = document.getElementById('canvas');

cnv.width = window.innerWidth;
cnv.height = window.innerHeight;

let eng = new Engine({
    canvas: cnv
});

let cameraPosition = new Point(0, 0, 0);

let cam = new Camera({
    id: 'cam1',
    position: cameraPosition
});

let scn = new Scene({
    id: 'scn1',
    name: 'Testing Scene',
    camera: cam
});

scn
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
            drawPoints: true
        }
    }))
    .addObject(new Object3D({
        id: 'plane2',
        position: new Point(-100, -240, 0),
        geometry: new Plane(150),
        options: {
            drawPoints: true
        }
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

eng
    .addScene(scn)
    .renderScene('scn1');

window.onkeydown = (e => {
    let updateScene = cameraPosition => {
        cam.setPosition(cameraPosition);
        eng.renderScene('scn1');
    };

    switch (e.keyCode) {
        case 37: // Left
        case 65: // A
            cameraPosition.setCoords(cameraPosition.getX() - 10, cameraPosition.getY(), cameraPosition.getZ());
            updateScene(cameraPosition);
            break;
        case 39: // Right
        case 68: // D
            cameraPosition.setCoords(cameraPosition.getX() + 10, cameraPosition.getY(), cameraPosition.getZ());
            updateScene(cameraPosition);
            break;
        case 38: // Up
            cameraPosition.setCoords(cameraPosition.getX(), cameraPosition.getY() + 10, cameraPosition.getZ());
            updateScene(cameraPosition);
            break;
        case 40: // Down
            cameraPosition.setCoords(cameraPosition.getX(), cameraPosition.getY() - 10, cameraPosition.getZ());
            updateScene(cameraPosition);
            break;
        case 87: // W
            cameraPosition.setCoords(cameraPosition.getX(), cameraPosition.getY(), cameraPosition.getZ() - 10);
            updateScene(cameraPosition);
            break;
        case 83: // S
            cameraPosition.setCoords(cameraPosition.getX(), cameraPosition.getY(), cameraPosition.getZ() + 10);
            updateScene(cameraPosition);
            break;
    }
});