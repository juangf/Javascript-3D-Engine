import Loader from "./Loader.js";
import Object3D from "../Object3D.js";
import Point from "../Point.js";
import Polygon from "../Polygon.js";
import Geometry from "../../engine/Geometry.js";

class Parser {
    constructor(file) {
        let loader = new Loader();
        this.raw = loader.load(file);

        return this.parse();
    }

    parse() {
        let obj = {};
        let vertexMatches = this.raw.match(/^v( -?\d+(\.\d+)?){3}$/gm);
        if (vertexMatches) {
            obj.vertices = vertexMatches.map(function(vertex) {
                let vertices = vertex.split(" ");
                vertices.shift();
                return vertices;
            });
        }

        let facesMatches = this.raw.match(/^f ((\d+)((\/\d+)?)((\/\d+)?)( ?)){3}$/gm);
        if (facesMatches) {
            obj.faces = facesMatches.map(function(face) {
                let faces = face.split(" ");
                faces.shift();
                faces.forEach(function (e, i) {
                    if (e.indexOf("/") !== -1) {
                        faces[i] = (e.split('/')[0] - 1);
                    } else {
                        faces[i] = e - 1;
                    }
                });

                return faces;
            });
        }

        this.obj = obj;
        this.createObject();

        return new Object3D({
            id: 'test',
            position: new Point(0,0,0),
            geometry: this.object,
            options: {
                drawPoints: true,
                drawNormals: true
            }
        });
    }

    createObject() {
        this.object = new Geometry();
        if (this.obj !== {}) {
            this.obj.vertices.forEach(function (element) {
                this.object.addPoint(new Point(element[0] * 100, element[1] * 100, element[2] * 100));
            }, this);
            this.obj.faces.forEach(function (element) {
                this.object.addPolygon(new Polygon(element));
            }, this);
        }
    }
}

export default Parser;