class Utils {
    static degToRad(alpha) {
        return alpha * Math.PI / 180;
    }
    static radToDeg(radians) {
        return radians * 180 / Math.PI;
    }
    static getNormal(p0, p1, p2) {
        let ab1 = Point.substract(p1, p2);
        let ab2 = Point.substract(p1, p0);
        let ab1xab2 = Point.dotProduct(ab1, ab2);
        return Point.normalize(ab1xab2);
    }
}

export default Utils;