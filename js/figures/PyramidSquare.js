import Point from '../engine/Point.js'
import Poligon from '../engine/Poligon.js'
import Geometry from '../engine/Geometry.js'

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
  constructor (h, w, d) {
    super()
    this
      .addPoint(new Point(0, (-h / 2), 0))
      .addPoint(new Point((w / 2), (h / 2), (d / 2)))
      .addPoint(new Point((w / 2), (h / 2), -(d / 2)))
      .addPoint(new Point(-(w / 2), (h / 2), -(d / 2)))
      .addPoint(new Point(-(w / 2), (h / 2), (d / 2)))

    this
      .addPoligon(new Poligon([1, 2, 3, 4]))
      .addPoligon(new Poligon([0, 1]))
      .addPoligon(new Poligon([0, 2]))
      .addPoligon(new Poligon([0, 3]))
      .addPoligon(new Poligon([0, 4]))
  }
}

export default PyramidSquare;