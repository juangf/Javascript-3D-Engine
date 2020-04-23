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
    constructor(w, h, d, allTriangles = true) {
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

        if (allTriangles) {
            this
                .addPolygon(new Polygon([0, 1, 2, 0]))
                .addPolygon(new Polygon([0, 2, 3, 0]))
                .addPolygon(new Polygon([3, 5, 0, 3]))
                .addPolygon(new Polygon([3, 6, 5, 3]))
                .addPolygon(new Polygon([4, 5, 6, 4]))
                .addPolygon(new Polygon([4, 6, 7, 4]))
                .addPolygon(new Polygon([1, 4, 7, 1]))
                .addPolygon(new Polygon([1, 7, 2, 1]))
                .addPolygon(new Polygon([5, 4, 1, 5]))
                .addPolygon(new Polygon([5, 1, 0, 5]))
                .addPolygon(new Polygon([3, 2, 7, 3]))
                .addPolygon(new Polygon([3, 7, 6, 3]));
        } else {
            this
                .addPolygon(new Polygon([0, 1, 2, 3]))
                .addPolygon(new Polygon([0, 3, 6, 5]))
                .addPolygon(new Polygon([4, 5, 6, 7]))
                .addPolygon(new Polygon([1, 4, 7, 2]))
                .addPolygon(new Polygon([5, 4, 1, 0]))
                .addPolygon(new Polygon([3, 2, 7, 6]));
        }

        this.calcNormals();
    }
}

export default RegularPrism;