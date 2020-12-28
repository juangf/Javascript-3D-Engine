class Point {

    constructor(x, y, z, w = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w; // If the Vector is director, w = 0
        this.normal = null; // If it is a geometry vertex, it stores the calculated vertex normal
    }

    setCoords(x, y, z, w = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    }

    getCoords() {
        return [this.x, this.y, this.z, this.w];
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getZ() {
        return this.z;
    }

    setNormal(normal) {
        this.normal = normal;
        return this;
    }

    getNormal() {
        return this.normal;
    }

    static add(p1, p2) {
        return new Point(p2.getX() + p1.getX(), p2.getY() + p1.getY(), p2.getZ() + p1.getZ());
    }

    static substract(p1, p2) {
        return new Point(p2.getX() - p1.getX(), p2.getY() - p1.getY(), p2.getZ() - p1.getZ());
    }

    static multiply(p1, v) {
        return new Point(p1.getX() * v, p1.getY() * v, p1.getZ() * v);
    }

    static dotProduct(p1, p2) {
        return new Point(
            p1.getY() * p2.getZ() - p1.getZ() * p2.getY(),
            p1.getZ() * p2.getX() - p1.getX() * p2.getZ(),
            p1.getX() * p2.getY() - p1.getY() * p2.getX()
        );
    }

    static dot(p1, p2) {
        return p1.getX() * p2.getX() + p1.getY() * p2.getY() + p1.getZ() * p2.getZ();
    }

    static length(p) {
        return Math.sqrt(this.dot(p, p));
    }

    static normalize(p) {
        let m = this.length(p);
        if (m > 0) {
            return new Point(p.getX() / m, p.getY() / m, p.getZ() / m);
        } else {
            return p;
        }
    }

    static multiplyMatrix(p, m) {
        let size = m.getSize();
        let coords = p.getCoords();
        let res = [0, 0, 0];

        for (let i = 0; i < size; i++) {
            let sum = 0;
            for (let j = 0; j < size; j++) {
                sum += m.getValue(i, j) * coords[j];
            }
            res[i] = sum;
        }

        return new Point(res[0], res[1], res[2], res[3]);
    }

    static angleBetween(v1, v2) {
        var dot = this.dot(v1, v2);
        var mod1 = this.length(v1);
        var mod2 = this.length(v2);

        if (!mod2 || !mod1) {
            return 0;
        }

        var alpha = dot / (mod1 * mod2);

        if (alpha < -1) alpha = -1; 
        else if (alpha > 1) alpha = 1;
        
        return Math.acos(alpha);
    }
}

export default Point;