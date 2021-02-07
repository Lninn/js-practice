import { CONFIG, ORIGINAL_POINT, INTERVAL } from './constant'
import {
  transposeBlock,
  getRandomBlock,
  getBotomPoints,
  getLeftPoints,
  getRightPoints,
} from './utils'

import CellMap from './CellMap'

const cellMap = CellMap.getInstance()

export default class Block {
  constructor() {
    this.reset()
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
    const width = block[0].length * INTERVAL
    const height = block.length * INTERVAL

    return { width, height }
  }

  transpose() {
    const { canvasWidth, canvasHeight } = CONFIG

    const newBlock = transposeBlock(this.block)
    const newPoints = this.getPoints(newBlock)

    const { width, height } = this.getSize(newBlock)
    if (this.x + width > canvasWidth || this.y + height > canvasHeight) {
      return
    }

    if (cellMap.check(newPoints)) {
      return
    }

    this.width = width
    this.height = height
    this.block = newBlock
    this.points = newPoints
  }

  moveUp() {
    this.y = this.y - INTERVAL
    this.points = this.getPoints(this.block)
  }

  moveLeft() {
    if (this.x <= 0) {
      return
    }

    const points = getLeftPoints(this.points).map((point) => {
      return {
        ...point,
        x: point.x - INTERVAL,
      }
    })

    if (cellMap.check(points)) {
      return
    }

    this.x = this.x - INTERVAL
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
        x: point.x + INTERVAL,
      }
    })

    if (cellMap.check(points)) {
      return
    }

    this.x = this.x + INTERVAL
    this.points = this.getPoints(this.block)
  }

  update() {
    if (this.collision()) {
      cellMap.set(this.points)

      cellMap.update()

      this.reset()
    } else {
      this.y = this.y + INTERVAL
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
        y: point.y + INTERVAL,
      }
    })

    if (cellMap.check(points)) {
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
      const x = this.x + INTERVAL * point.x
      const y = this.y + INTERVAL * point.y

      return { x, y }
    })
  }

  draw(context) {
    this.points.forEach((point) => {
      context.beginPath()
      context.rect(point.x, point.y, INTERVAL, INTERVAL)

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
