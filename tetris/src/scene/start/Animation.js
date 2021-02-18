import { UN_FLAGGED, FLAGGED, Config } from '../../constant'
import { createNumbers, create2DimList } from '../../utils'

export default class Animation {
  constructor(scene) {
    this.scene = scene

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
    this.direction = -1
    this.downToUp = this.yAxes.length - 1
    this.upToDownIndex = -1
  }

  update() {
    const {
      flaggedOfMap,
      points,
      xAxes,
      yAxes,
      downToUp,
      direction,
      upToDownIndex,
      scene,
    } = this

    if (upToDownIndex > yAxes.length - 2) {
      scene.start()
    } else if (downToUp < 0) {
      this.upToDownIndex = upToDownIndex + 1

      this.points = this.points.filter((point) => {
        return point.y !== this.upToDownIndex * Config.sideOfLength
      })
    } else {
      for (const x of xAxes) {
        flaggedOfMap[downToUp][x] = FLAGGED

        points.push({
          x: x * Config.sideOfLength,
          y: downToUp * Config.sideOfLength,
        })
      }

      this.downToUp = downToUp + direction
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
