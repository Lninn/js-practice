import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  SIDE_OF_LENGTH,
  UN_FLAGGED,
  FLAGGED,
} from '../constant'
import { drawPoints } from '../Shape'
import { createNumbers, create2DimList } from '../utils'

export default class Animation {
  constructor() {
    this.setup()
  }

  setup() {
    this.flaggedOfMap = create2DimList(BOARD_WIDTH, BOARD_HEIGHT, UN_FLAGGED)
    this.xAxes = createNumbers(BOARD_WIDTH)
    this.yAxes = createNumbers(BOARD_HEIGHT)

    this.points = []

    // initial direction is up
    this.numOfUpdateYAxis = this.yAxes.length - 1
    this.direction = -1
  }

  update() {
    const {
      flaggedOfMap,
      points,
      xAxes,
      yAxes,
      numOfUpdateYAxis,
      direction,
    } = this

    for (const x of xAxes) {
      flaggedOfMap[numOfUpdateYAxis][x] = FLAGGED

      points.push({
        x: x * SIDE_OF_LENGTH,
        y: numOfUpdateYAxis * SIDE_OF_LENGTH,
      })
    }

    this.numOfUpdateYAxis = numOfUpdateYAxis + direction

    if (this.numOfUpdateYAxis < 0 || this.numOfUpdateYAxis > yAxes.length - 1) {
      this.points = []
      this.map = create2DimList(BOARD_WIDTH, BOARD_HEIGHT, UN_FLAGGED)
      this.direction = this.direction * -1
      this.numOfUpdateYAxis = this.direction > 0 ? 0 : yAxes.length - 1
    }
  }

  draw(context) {
    drawPoints(this.points, context)
  }
}
