import Point from '../engine/Point.js';
import Polygon from '../engine/Polygon.js';
import Geometry from '../engine/Geometry.js';

class Cube extends Geometry {
    /*
        5________4
       / |      /|
      0________1 |
      |  6_____|_7
      | /      | /
      3________2/
    */
    constructor(size) {
        super();
        size = size / 2;

        this.addPoint(new Point(-size, -size, -size));
        this.addPoint(new Point(size, -size, -size));
        this.addPoint(new Point(size, size, -size));
        this.addPoint(new Point(-size, size, -size));
        this.addPoint(new Point(size, -size, size));
        this.addPoint(new Point(-size, -size, size));
        this.addPoint(new Point(-size, size, size));
        this.addPoint(new Point(size, size, size));

        this.addPolygon(new Polygon([0, 1, 2, 3]));
        this.addPolygon(new Polygon([0, 3, 6, 5]));
        this.addPolygon(new Polygon([4, 5, 6, 7]));
        this.addPolygon(new Polygon([1, 4, 7, 2]));
        this.addPolygon(new Polygon([5, 4, 1, 0]));
        this.addPolygon(new Polygon([3, 2, 7, 6]));
    }
}

export default Cube;