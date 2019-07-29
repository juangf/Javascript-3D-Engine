class RenderedPolygon {
    constructor(points = [], options = {}) {
        this.points = points;
        this.pointsIndexs = [];
        this.options = Object.assign({
            drawPoints: false,
            drawNormals: false
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
}

export default RenderedPolygon;