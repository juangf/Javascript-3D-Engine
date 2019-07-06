import Point from '../engine/Point.js'
import Poligon from '../engine/Poligon.js'
import Geometry from '../engine/Geometry.js'

class Plane extends Geometry {
  constructor(size) {
    super();
    this.addPoint(new Point(0, 0, 0));
    this.addPoint(new Point(0, 0, size));
    this.addPoint(new Point(size, 0, size));
    this.addPoint(new Point(size, 0, 0));

    this.addPoligon(new Poligon([0, 1, 2, 3]));
  }
}

export default Plane;