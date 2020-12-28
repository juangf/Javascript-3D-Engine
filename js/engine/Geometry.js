import Point from './Point.js';
import Utils from './Utils.js';
class Geometry {

    constructor() {
        this.points = [];
        this.poligons = [];
    }

    addPoint(point) {
        this.points.push(point);
        return this;
    }

    getPoints() {
        return this.points;
    }

    addPolygon(polygon) {
        this.poligons.push(polygon);
        return this;
    }

    getPolygon() {
        return this.poligons;
    }

    calcNormals() {
        let pointsNormalsList = {};

        // Calc poligon normal
        for (let i = 0; i < this.poligons.length; i++) {
            let poly = this.poligons[i],
                indexs = poly.getIndexs(),
                normal = Utils.getNormal(this.points[indexs[0]], this.points[indexs[1]], this.points[indexs[2]]);

            poly.setNormal(normal);

            for (let j = 0; j < indexs.length; j++) {
                if (typeof pointsNormalsList[indexs[j]] === 'undefined') {
                    pointsNormalsList[indexs[j]] = [normal];
                } else {
                    pointsNormalsList[indexs[j]].push(normal);
                }
            }
        }

        // Calc vertex normals
        for (const index in pointsNormalsList) {
            let normals = pointsNormalsList[index],
                resultNormal = normals[0];

            for (let i = 1; i < normals.length; i++) {
                resultNormal = Point.add(resultNormal, normals[i]);
            }
            this.points[index].setNormal(Point.normalize(resultNormal));
        }
    }
}

export default Geometry;