class Utils {
    static degToRad(alpha) {
        return alpha * Math.PI / 180;
    }
    static radToDeg(radians) {
        return radians * 180 / Math.PI;
    }
}

export default Utils;