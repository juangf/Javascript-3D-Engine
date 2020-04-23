import Point from '../engine/Point.js';
import Polygon from '../engine/Polygon.js';
import Geometry from '../engine/Geometry.js';

/**
 * Square base pyramid definition.
 */
class PyramidSquare extends Geometry {

    /**
     * Constructor.
     *
     * @param {number} h high
     * @param {number} w width
     * @param {number} d dept
     */
    constructor(h, w, d) {
        super();
        this
            .addPoint(new Point(0, h / 2, 0))
            .addPoint(new Point(w / 2, -h / 2, d / 2))
            .addPoint(new Point(w / 2, -h / 2, -d / 2))
            .addPoint(new Point(-w / 2, -h / 2, -d / 2))
            .addPoint(new Point(-w / 2, -h / 2, d / 2));

        this
            .addPolygon(new Polygon([3, 4, 1, 2]))
            .addPolygon(new Polygon([0, 2, 1]))
            .addPolygon(new Polygon([0, 3, 2]))
            .addPolygon(new Polygon([0, 4, 3]))
            .addPolygon(new Polygon([0, 1, 4]));
        
        this.calcNormals();
    }
}

export default PyramidSquare;