import { SIDE_OF_LENGTH } from './constant'
import { drawPoints } from './Shape'

export default class Drawer {
  constructor(board) {
    this.points = []
    this.board = board
  }

  addPoints(newPoints = []) {
    this.points = this.points.concat(newPoints)
  }

  update(updatedYAxes) {
    const { board, points } = this
    const yAxisTail = 19

    let newPoints = points
    updatedYAxes.forEach((y) => {
      newPoints = newPoints.filter((point) => {
        return point.y !== y * SIDE_OF_LENGTH
      })
    })

    updatedYAxes.forEach((_) => {
      board.updateFlagWithPoints(newPoints, 0)
      newPoints = newPoints.map((point) => {
        if (point.y === yAxisTail * SIDE_OF_LENGTH) {
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
    drawPoints(this.points, context)
  }
}
