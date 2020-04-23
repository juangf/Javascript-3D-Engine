import Point from '../engine/Point.js';
import Polygon from '../engine/Polygon.js';
import Geometry from '../engine/Geometry.js';

class Cone extends Geometry {
    constructor(radius, height, space) {
        super();
        let index = 0;

        this.addPoint(new Point(0, 0, 0));
        this.addPoint(new Point(0, height, 0));

        for (let i = 0, b = space; i < 360 / space; i++, b += space) {
            this.addPoint(new Point(
                radius * Math.sin(b / 180 * Math.PI),
                0,
                radius * Math.cos(b / 180 * Math.PI)
            ));
            if (index > 0) {
                this.addPolygon(new Polygon([0, index + 1, index + 2]));
            }
            this.addPolygon(new Polygon([1, index + 2, index + 1]));
            index++;
        }

        this.addPolygon(new Polygon([0, index + 1, 2]));
        this.addPolygon(new Polygon([1, 2, index + 1]));

        this.calcNormals();
    }
}

export default Cone;