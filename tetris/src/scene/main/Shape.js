import { ORIGINAL_POINT, Config } from '../../constant'
import { isFlagged } from './Board'
import { getRandomBlock, transposeBlock, getSize } from '../../block'

export default class Shape {
  constructor(board) {
    this.board = board

    this.reset()
  }

  reset() {
    this.fps = 1
    this.timer = 0

    this.x = ORIGINAL_POINT.x
    this.y = ORIGINAL_POINT.y

    const block = getRandomBlock()
    const points = this.getPoints(block)
    const { width, height } = getSize(block)

    this.width = width
    this.height = height
    this.block = block
    this.points = points
  }

  transpose() {
    const { board } = this

    const newBlock = transposeBlock(this.block)
    const newPoints = this.getPoints(newBlock)

    const { width, height } = getSize(newBlock)
    if (
      this.x + width > Config.CanvasWidth ||
      this.y + height > Config.CanvasHeight ||
      board.isValidOfPreTranspose(newPoints)
    ) {
      return
    }

    this.width = width
    this.height = height
    this.block = newBlock
    this.points = newPoints
  }

  moveUp() {
    this.y = this.y - Config.sideOfLength
    this.points = this.getPoints(this.block)
  }

  moveLeft() {
    const { board } = this

    if (this.x <= 0 || board.isValidOfPreLeft(this.points)) {
      return
    }

    this.x = this.x - Config.sideOfLength
    this.points = this.getPoints(this.block)
  }

  moveRight() {
    const { board } = this

    if (
      this.x + this.width >= Config.CanvasWidth ||
      board.isValidOfPreRight(this.points)
    ) {
      return
    }

    this.x = this.x + Config.sideOfLength
    this.points = this.getPoints(this.block)
  }

  moveBottom() {
    this.fps = 60
  }

  update(delta) {
    this.timer += delta

    if (this.timer >= 1000 / this.fps) {
      this.y = this.y + Config.sideOfLength
      this.points = this.getPoints(this.block)

      this.timer = 0
    }
  }

  getPoints(block) {
    const indexs = []

    block.forEach((flags, colIndex) => {
      flags.forEach((flag, rowIndex) => {
        isFlagged(flag) && indexs.push({ x: rowIndex, y: colIndex })
      })
    })

    return indexs.map((point) => {
      const x = this.x + Config.sideOfLength * point.x
      const y = this.y + Config.sideOfLength * point.y

      return { x, y }
    })
  }

  draw(context) {
    drawPoints(this.points, context, false)
  }
}

export function drawPoints(points = [], context, isStroke = true) {
  const strokeStyle = context.strokeStyle
  const fillStyle = context.fillStyle

  points.forEach((point) => {
    context.beginPath()
    context.rect(point.x, point.y, Config.sideOfLength, Config.sideOfLength)

    context.strokeStyle = Config.shape.strokeStyle
    context.fillStyle = Config.shape.fillStyle

    isStroke && context.stroke()
    context.fill()
    context.closePath()
  })

  context.strokeStyle = strokeStyle
  context.fillStyle = fillStyle
}
