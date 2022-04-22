import Point from '../engine/Point.js';
import Polygon from '../engine/Polygon.js';
import Geometry from '../engine/Geometry.js';

class Plane extends Geometry {
    constructor(size, space = 1) {
        super();
        size = size / space;

        for (let i = 0, b = 0; i <= space; i++, b += space + 1) {
            for (let j = 0; j <= space; j++) {
                this.addPoint(new Point(j * size, 0, i * size));
                if (j < space && i < space) {
                    let bj = b + j;
                    this.addPolygon(new Polygon([
                        bj,
                        bj + 1,
                        bj + space + 1]
                    ));
                    this.addPolygon(new Polygon([
                        bj + 1,
                        bj + space + 2,
                        bj + space + 1]
                    ));
                }
            }
        }

        this.calcNormals();
    }
}

export default Plane;