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
        for (let i = 0; i < this.poligons.length; i++) {
            let poly = this.poligons[i];
            let indexs = poly.getIndexs();
            poly.setNormal(Utils.getNormal(this.points[indexs[0]], this.points[indexs[1]], this.points[indexs[2]]));
        }
    }
}

export default Geometry;