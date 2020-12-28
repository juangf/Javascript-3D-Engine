class RenderedPolygon {
    constructor(points = [], options = {}) {
        this.points = points;
        this.pointsIndexs = [];
        this.normal = null;
        this.options = Object.assign({
            drawPoints: false,
            drawNormals: false,
            drawVertexNormals: false,
            wireFrame: false,
            rgbaColor: ''
        }, options);
    }

    getOptions() {
        return this.options;
    }

    getPoints() {
        return this.points;
    }

    addPoint(point) {
        this.points.push(point);
        return this;
    }

    getPointIndexs() {
        return this.pointsIndexs;
    }

    addPointIndex(index) {
        this.pointsIndexs.push(index);
        return this;
    }

    setOptions(options) {
        this.options = Object.assign(this.options, options);
        return this;
    }

    setNormal(normal) {
        this.normal = normal;
        return this;
    }

    getNormal() {
        return this.normal;
    }
}

export default RenderedPolygon;