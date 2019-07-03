let cnv = document.getElementById('canvas');

cnv.width  = window.innerWidth;
cnv.height = window.innerHeight;

let eng = new Engine({
    canvas: cnv
});

let cam = new Camera({
    id: 'cam1',
    position: new Point(window.innerWidth / 2, window.innerHeight / 2, 0)
});

let scn = new Scene({
    id: 'scn1',
    name: 'Testing Scene',
    camera: cam 
});

scn
    .addObject(new Object3D({
        id: 'cube1',
        position: new Point(100, 100, 0),
        geometry: new Cube(100),
        options: {
            drawPoints: true
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
        geometry: new Cube(70)
    }))
    .addObject(new Object3D({
        id: 'plane1',
        position: new Point(-200, 200, 0),
        geometry: new Plane(150),
        options: {
            drawPoints: true
        }
    }))
    .addObject(new Object3D({
        id: 'plane2',
        position: new Point(100, -200, 0),
        geometry: new Plane(150),
        options: {
            drawPoints: true
        }
    }))
    .addObject(new Object3D({
        id: 'sphere1',
        position: new Point(140, 0, 0),
        geometry: new Sphere(50, 30)
    }));

eng
    .addScene(scn)
    .renderScene('scn1');
