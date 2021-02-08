import { SIDE_OF_LENGTH } from './constant'

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
      board.setStateWithPoints(newPoints, 0)
      newPoints = newPoints.map((point) => {
        if (point.y === yAxisTail * SIDE_OF_LENGTH) {
          return point
        }

        return {
          ...point,
          y: point.y + SIDE_OF_LENGTH,
        }
      })
      board.setStateWithPoints(newPoints, 1)
    })

    this.points = newPoints
  }

  draw(context) {
    this.points.forEach((point) => {
      context.beginPath()
      context.rect(point.x, point.y, SIDE_OF_LENGTH, SIDE_OF_LENGTH)

      const strokeStyle = context.strokeStyle
      context.strokeStyle = '#0095DD'
      context.strokeStyle = strokeStyle

      context.stroke()
      context.fill()
      context.closePath()
    })
  }
}
