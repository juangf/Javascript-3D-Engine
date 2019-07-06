class Geometry {

  constructor () {
    this.points = []
    this.poligons = []
  }

  addPoint (point) {
    this.points.push(point)
    return this
  }

  getPoints () {
    return this.points
  }

  addPoligon (poligon) {
    this.poligons.push(poligon)
    return this
  }

  getPoligons () {
    return this.poligons
  }
}

export default Geometry