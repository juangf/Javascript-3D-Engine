import Point from '../engine/Point.js';
import Polygon from '../engine/Polygon.js';
import Geometry from '../engine/Geometry.js';

/**
 * Object with 6 faces, 12 edges, and 8 vertices.
 */
class RegularPrism extends Geometry {

    /**
     * Constructor.
     *
     * @param {number} w high
     * @param {number} h width
     * @param {number} d dept
     */
    constructor(w, h, d) {
        super();
        h = h / 2;
        w = w / 2;
        d = d / 2;

        this
            .addPoint(new Point(-h, -w, -d))
            .addPoint(new Point(h, -w, -d))
            .addPoint(new Point(h, w, -d))
            .addPoint(new Point(-h, w, -d))
            .addPoint(new Point(h, -w, d))
            .addPoint(new Point(-h, -w, d))
            .addPoint(new Point(-h, w, d))
            .addPoint(new Point(h, w, d));

        this
            .addPolygon(new Polygon([0, 1, 2, 3]))
            .addPolygon(new Polygon([0, 3, 6, 5]))
            .addPolygon(new Polygon([4, 5, 6, 7]))
            .addPolygon(new Polygon([1, 4, 7, 2]))
            .addPolygon(new Polygon([5, 4, 1, 0]))
            .addPolygon(new Polygon([3, 2, 7, 6]));
    }
}

export default RegularPrism;