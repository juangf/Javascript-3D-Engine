import Loader from "./Loader.js";
import Object3D from "../Object3D.js";
import Point from "../Point.js";
import Polygon from "../Polygon.js";
import Geometry from "../../engine/Geometry.js";

class Generate {

    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {string} file
     * @param {number} size
     * @returns {Object3D}
     */
    constructor(x, y, z, file, size = 100) {
        this.point = {x: x, y: y, z: z};
        this.size = size || 100;
        this.file = file || null;

        let loader = new Loader();
        this.raw = loader.load(this.file);

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

        let name = this.raw.match(/^o (\S+)/gm);
        if (name) {
            obj.name = name[0].split(" ")[1];
        }

        this.obj = obj;
        this.createObject();

        return new Object3D({
            id: this.obj.name,
            position: new Point(this.point.x, this.point.y, this.point.z),
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
                this.object.addPoint(new Point(element[0] * this.size, element[1] * this.size, element[2] * this.size));
            }, this);
            this.obj.faces.forEach(function (element) {
                this.object.addPolygon(new Polygon(element.reverse()));
            }, this);
        }
    }
}

export default Generate;