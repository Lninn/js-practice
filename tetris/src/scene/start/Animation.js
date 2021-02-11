import { UN_FLAGGED, FLAGGED, Config } from '../../constant'
import { createNumbers, create2DimList } from '../../utils'

export default class Animation {
  constructor() {
    this.setup()
  }

  setup() {
    this.flaggedOfMap = create2DimList(
      Config.BoardWidth,
      Config.BoardHeight,
      UN_FLAGGED,
    )
    this.xAxes = createNumbers(Config.BoardWidth)
    this.yAxes = createNumbers(Config.BoardHeight)

    this.points = []

    // initial direction is up
    this.numOfUpdateYAxis = this.yAxes.length - 1
    this.direction = -1

    this.opacity = 0
    this.addOpacity = 0.05

    this.count = 1
  }

  update(callback) {
    const {
      flaggedOfMap,
      points,
      xAxes,
      yAxes,
      numOfUpdateYAxis,
      direction,
    } = this

    if (this.count === 3) {
      callback()
      return
    }

    for (const x of xAxes) {
      flaggedOfMap[numOfUpdateYAxis][x] = FLAGGED

      points.push({
        x: x * Config.sideOfLength,
        y: numOfUpdateYAxis * Config.sideOfLength,
      })
    }

    this.numOfUpdateYAxis = numOfUpdateYAxis + direction
    this.opacity = this.opacity + this.addOpacity

    if (this.opacity < 0) {
      this.opacity = 0
    } else if (this.opacity > 1) {
      this.opacity = 1
    }

    if (this.numOfUpdateYAxis < 0 || this.numOfUpdateYAxis > yAxes.length - 1) {
      this.points = []
      this.map = create2DimList(
        Config.BoardWidth,
        Config.BoardHeight,
        UN_FLAGGED,
      )
      this.direction = this.direction * -1
      this.numOfUpdateYAxis = this.direction > 0 ? 0 : yAxes.length - 1
      this.addOpacity = this.addOpacity === 0.05 ? -0.05 : 0.05
      this.count++
    }
  }

  draw(context) {
    const strokeStyle = context.strokeStyle
    const fillStyle = context.fillStyle
    const globalAlpha = context.globalAlpha

    this.points.forEach((point) => {
      context.beginPath()
      context.rect(point.x, point.y, Config.sideOfLength, Config.sideOfLength)

      context.strokeStyle = Config.shape.strokeStyle
      context.fillStyle = Config.shape.fillStyle
      context.globalAlpha = this.opacity

      context.stroke()
      context.fill()
      context.closePath()
    })

    context.strokeStyle = strokeStyle
    context.fillStyle = fillStyle
    context.globalAlpha = globalAlpha
  }
}
