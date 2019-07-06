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
}

export default Geometry;