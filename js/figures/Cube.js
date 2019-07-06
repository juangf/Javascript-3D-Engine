import Point from '../engine/Point.js'
import Poligon from '../engine/Poligon.js'
import Geometry from '../engine/Geometry.js'
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

    this.addPoligon(new Poligon([0, 1, 2, 3]));
    this.addPoligon(new Poligon([0, 3, 6, 5]));
    this.addPoligon(new Poligon([4, 5, 6, 7]));
    this.addPoligon(new Poligon([1, 4, 7, 2]));
    this.addPoligon(new Poligon([5, 4, 1, 0]));
    this.addPoligon(new Poligon([3, 2, 7, 6]));
  }
}

export default Cube;