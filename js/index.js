let cnv = document.getElementById('canvas');

cnv.width  = window.innerWidth;
cnv.height = window.innerHeight;

let eng = new Engine({
    canvas: cnv
});

let cam = new Camera({
    id: 'cam1',
    position: new Point(0, 50, 0)
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
    }));

eng
    .addScene(scn)
    .renderScene('scn1');
