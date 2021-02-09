import {
  ORIGINAL_POINT,
  SIDE_OF_LENGTH,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from './constant'
import Board, { isFlagged } from './Board'
import { getRandomBlock, transposeBlock, getSize } from './block'

const board = Board.getInstance()

export default class Shape {
  constructor() {
    this.reset()
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new this()
    }

    return this.instance
  }

  reset() {
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
    const newBlock = transposeBlock(this.block)
    const newPoints = this.getPoints(newBlock)

    const { width, height } = getSize(newBlock)
    if (
      this.x + width > CANVAS_WIDTH ||
      this.y + height > CANVAS_HEIGHT ||
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
    this.y = this.y - SIDE_OF_LENGTH
    this.points = this.getPoints(this.block)
  }

  moveLeft() {
    if (this.x <= 0 || board.isValidOfPreLeft(this.points)) {
      return
    }

    this.x = this.x - SIDE_OF_LENGTH
    this.points = this.getPoints(this.block)
  }

  moveRight() {
    if (
      this.x + this.width >= CANVAS_WIDTH ||
      board.isValidOfPreRight(this.points)
    ) {
      return
    }

    this.x = this.x + SIDE_OF_LENGTH
    this.points = this.getPoints(this.block)
  }

  update() {
    if (
      this.y + this.height >= CANVAS_HEIGHT ||
      board.isValidOfPreDown(this.points)
    ) {
      board.updateFlagWithPoints(this.points)
      board.updateWithYAxes()

      this.reset()
    } else {
      this.y = this.y + SIDE_OF_LENGTH
      this.points = this.getPoints(this.block)
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
      const x = this.x + SIDE_OF_LENGTH * point.x
      const y = this.y + SIDE_OF_LENGTH * point.y

      return { x, y }
    })
  }

  draw(context) {
    drawPoints(this.points, context)
  }
}

export function drawPoints(points = [], context) {
  const strokeStyle = context.strokeStyle
  const fillStyle = context.fillStyle

  points.forEach((point) => {
    context.beginPath()
    context.rect(point.x, point.y, SIDE_OF_LENGTH, SIDE_OF_LENGTH)

    context.strokeStyle = '#0341AE'
    context.fillStyle = '#FFD500'

    context.stroke()
    context.fill()
    context.closePath()
  })

  context.strokeStyle = strokeStyle
  context.fillStyle = fillStyle
}
