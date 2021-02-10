import { SIDE_OF_LENGTH, CANVAS_HEIGHT, Config } from './constant'

export default class Drawer {
  constructor(board) {
    this.points = []
    this.board = board
  }

  static getInstance(...args) {
    if (!this.instance) {
      this.instance = new this(...args)
    }

    return this.instance
  }

  addPoints(newPoints = []) {
    this.points = this.points.concat(newPoints)
  }

  update(updatedYAxes) {
    const { board, points } = this
    let newPoints = points
    updatedYAxes.forEach((y) => {
      newPoints = newPoints.filter((point) => {
        return point.y !== y * SIDE_OF_LENGTH
      })
    })
    updatedYAxes.forEach((_) => {
      board.updateFlagWithPoints(newPoints, 0)
      newPoints = newPoints.map((point) => {
        // trail is 19 if Max countOfCol eq 20
        // the last is 19 * step
        if (point.y === CANVAS_HEIGHT - SIDE_OF_LENGTH) {
          return point
        }
        return {
          ...point,
          y: point.y + SIDE_OF_LENGTH,
        }
      })
      board.updateFlagWithPoints(newPoints, 1)
    })
    this.points = newPoints
  }

  draw(context) {
    const strokeStyle = context.strokeStyle
    const fillStyle = context.fillStyle

    this.points.forEach((point) => {
      context.beginPath()
      context.rect(point.x, point.y, SIDE_OF_LENGTH, SIDE_OF_LENGTH)

      context.strokeStyle = Config.shape.strokeStyle
      context.fillStyle = Config.shape.fillStyle

      context.stroke()
      context.fill()
      context.closePath()
    })

    context.strokeStyle = strokeStyle
    context.fillStyle = fillStyle
  }
}
