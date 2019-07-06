import Matrix from './Matrix.js'
import Point from './Point.js'

class Engine {

  constructor (config = {}) {
    this.config = Object.assign({
      drawPoints: false
    }, config)
    this.canvas = this.config.canvas
    this.ctx = canvas.getContext('2d')
    this.scenes = {}
  }

  renderLoop (objects, camera) {
    this.clearCanvas()
    Object.keys(objects).forEach(key => {
      this.drawObject(objects[key], camera)
    })
  }

  addScene (scene) {
    this.scenes[scene.id] = scene
    return this
  }

  renderScene (sceneId) {
    let scene = this.scenes[sceneId]
    let objects = scene.getObjects()
    let camera = scene.getCamera()

    this.renderLoop(objects, camera)
    setInterval(e => {
      this.renderLoop(objects, camera)
    }, 1000)
    return this
  }

  projection (axis, value, z) {
    return (value * 500) / (z + 500) + (axis === 'x' ? this.canvas.width : this.canvas.height) / 2
  }

  clearCanvas () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawPoint (point, position, transformsMatrix, text = false) {
    let p = Point.multiplyMatrix(Point.add(point, position), transformsMatrix)
    let x = this.projection('x', p.getX(), p.getZ())
    let y = this.projection('y', p.getY(), p.getZ())

    this.ctx.beginPath()
    this.ctx.arc(x, y, 4, 0, Math.PI * 2, true)
    this.ctx.stroke()

    if (text !== false) {
      this.ctx.font = '10px Verdana'
      this.ctx.strokeText(text, x + 4, y - 4)
    }
    return this
  }

  drawPoligonNormal (poligon, position, points, transformsMatrix) {
    let indexs = poligon.getIndexs()
    let p0 = points[indexs[0]]
    let p1 = points[indexs[1]]
    let p2 = points[indexs[2]]
    let ab1 = Point.substract(p1, p0)
    let ab2 = Point.substract(p1, p2)
    let ab1xab2 = Point.dotProduct(ab1, ab2)
    let pDir = Point.multiply(Point.normalize(ab1xab2), 25)
    let p = Point.multiplyMatrix(Point.add(p1, position), transformsMatrix)

    this.ctx.beginPath()
    this.ctx.moveTo(
      this.projection('x', p.getX(), p.getZ()),
      this.projection('y', p.getY(), p.getZ())
    )
    this.ctx.strokeStyle = '#FF0000'
    this.ctx.lineTo(
      this.projection('x', p.getX() + pDir.getX(), p.getZ() + pDir.getZ()),
      this.projection('y', p.getY() + pDir.getY(), p.getZ() + pDir.getZ())
    )
    this.ctx.stroke()
    this.ctx.strokeStyle = '#000000'
  }

  drawPoligon (poligon, position, points, transformsMatrix, drawPoints = false, drawNormals = false) {
    let indexs = poligon.getIndexs()
    let numindexs = indexs.length
    let p0 = points[indexs[0]]

    if (this.isVisible(poligon, transformsMatrix)) {
      let p = Point.multiplyMatrix(Point.add(p0, position), transformsMatrix)
      this.ctx.beginPath()
      this.ctx.moveTo(
        this.projection('x', p.getX(), p.getZ()),
        this.projection('y', p.getY(), p.getZ())
      )

      for (let i = 1; i < numindexs; i++) {
        let p = Point.multiplyMatrix(Point.add(points[indexs[i]], position), transformsMatrix)
        this.ctx.lineTo(
          this.projection('x', p.getX(), p.getZ()),
          this.projection('y', p.getY(), p.getZ())
        )
      }

      this.ctx.lineTo(
        this.projection('x', p.getX(), p.getZ()),
        this.projection('y', p.getY(), p.getZ())
      )
      this.ctx.closePath()
      this.ctx.stroke()

      if (drawNormals) {
        this.drawPoligonNormal(poligon, position, points, transformsMatrix)
      }

      if (drawPoints || this.config.drawPoints) {
        points.forEach((p, i) => {
          this.drawPoint(p, position, transformsMatrix, i)
        })
      }
    }
    return this
  }

  isVisible (poligon, camera) {
    // @todo check poligon visibility
    return true
  }

  drawObject (object, camera) {
    let pos = object.getPosition()
    let options = object.getOptions()
    let geometry = object.getGeometry()
    let poligons = geometry.getPoligons()
    let points = geometry.getPoints()
    let transforms = object.getTransforms()

    // Note: TransformedPoint = TranslationMatrix * RotationMatrix * ScaleMatrix * OriginalPoint
    let transformsMatrix = Matrix.multiply(camera.getMatrix(), transforms.scale)

    poligons.forEach(p => {
      this.drawPoligon(p, pos, points, transformsMatrix, options.drawPoints, options.drawNormals)
    })
    return this
  }
}

export default Engine;