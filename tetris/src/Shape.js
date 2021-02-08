import { CONFIG, ORIGINAL_POINT, SIDE_OF_LENGTH } from './constant'
import {
  transposeBlock,
  getRandomBlock,
  getBotomPoints,
  getLeftPoints,
  getRightPoints,
} from './utils'

import Board from './Board'

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
    const { width, height } = this.getSize(block)

    this.width = width
    this.height = height
    this.block = block
    this.points = points
  }

  getSize(block) {
    const width = block[0].length * SIDE_OF_LENGTH
    const height = block.length * SIDE_OF_LENGTH

    return { width, height }
  }

  transpose() {
    const { canvasWidth, canvasHeight } = CONFIG

    const newBlock = transposeBlock(this.block)
    const newPoints = this.getPoints(newBlock)

    const { width, height } = this.getSize(newBlock)
    if (
      this.x + width > canvasWidth ||
      this.y + height > canvasHeight ||
      board.check(newPoints)
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
    if (this.x <= 0) {
      return
    }

    const points = getLeftPoints(this.points).map((point) => {
      return {
        ...point,
        x: point.x - SIDE_OF_LENGTH,
      }
    })

    if (board.check(points)) {
      return
    }

    this.x = this.x - SIDE_OF_LENGTH
    this.points = this.getPoints(this.block)
  }

  moveRight() {
    const { canvasWidth } = CONFIG

    if (this.x + this.width >= canvasWidth) {
      return
    }

    const points = getRightPoints(this.points).map((point) => {
      return {
        ...point,
        x: point.x + SIDE_OF_LENGTH,
      }
    })

    if (board.check(points)) {
      return
    }

    this.x = this.x + SIDE_OF_LENGTH
    this.points = this.getPoints(this.block)
  }

  update() {
    if (this.collision()) {
      board.setStateWithPoints(this.points)

      board.update()

      this.reset()
    } else {
      this.y = this.y + SIDE_OF_LENGTH
      this.points = this.getPoints(this.block)
    }
  }

  collision() {
    if (this.y + this.height >= CONFIG.canvasHeight) {
      return true
    }

    const points = getBotomPoints(this.points).map((point) => {
      return {
        ...point,
        y: point.y + SIDE_OF_LENGTH,
      }
    })

    if (board.check(points)) {
      return true
    }

    return false
  }

  getPoints(block) {
    const cellIndexs = []

    block.forEach((outerElement, outerIndex) => {
      outerElement.forEach((innerElement, innerIndex) => {
        innerElement === 1 && cellIndexs.push({ x: innerIndex, y: outerIndex })
      })
    })

    return cellIndexs.map((point) => {
      const x = this.x + SIDE_OF_LENGTH * point.x
      const y = this.y + SIDE_OF_LENGTH * point.y

      return { x, y }
    })
  }

  draw(context) {
    this.points.forEach((point) => {
      context.beginPath()
      context.rect(point.x, point.y, SIDE_OF_LENGTH, SIDE_OF_LENGTH)

      const strokeStyle = context.strokeStyle
      const fillStyle = context.fillStyle
      context.strokeStyle = '#0341AE'
      context.fillStyle = '#FFD500'

      context.stroke()
      context.fill()

      context.strokeStyle = strokeStyle
      context.fillStyle = fillStyle
      context.closePath()
    })
  }
}
