class Polygon {

    constructor(indexs = [], normal = null) {
        this.indexs = indexs;
        this.normal = normal; // Normal vector
    }

    getIndexs() {
        return this.indexs;
    }

    setNormal(normal) {
        this.normal = normal;
        return this;
    }

    getNormal() {
        return this.normal;
    }
}

export default Polygon;