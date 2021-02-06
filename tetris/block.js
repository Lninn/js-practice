import { CONFIG, ORIGINAL_POINT, INTERVAL } from './constant'
import { transpose, getRandomBlock } from './utils'

export default class Block {
  constructor() {
    this.reset()
  }

  reset() {
    this.x = ORIGINAL_POINT.x
    this.y = ORIGINAL_POINT.y

    const block = getRandomBlock()

    const { width, height } = this.getSize(block)
    this.width = width
    this.height = height

    this.block = block
    this.setPointList()
  }

  getSize(block) {
    const width = block[0].length * INTERVAL
    const height = block.length * INTERVAL

    return { width, height }
  }

  setPointList() {
    const indexPoints = []

    this.block.forEach((outerElement, outerIndex) => {
      outerElement.forEach((innerElement, innerIndex) => {
        innerElement === 1 && indexPoints.push({ x: innerIndex, y: outerIndex })
      })
    })

    this.pointList = indexPoints.map((point) => {
      const x = this.x + INTERVAL * point.x
      const y = this.y + INTERVAL * point.y

      return { x, y }
    })
  }

  transpose() {
    const { canvasWidth, canvasHeight } = CONFIG

    const newBlock = transpose(this.block)
    const { width, height } = this.getSize(newBlock)

    if (this.x + width > canvasWidth || this.y + height > canvasHeight) {
      return
    }

    this.width = width
    this.height = height

    this.block = newBlock
    this.setPointList()
  }

  moveLeft() {
    if (this.x <= 0) {
      return
    }

    this.x = this.x - INTERVAL
  }

  moveRight() {
    const { canvasWidth } = CONFIG

    if (this.x + this.width >= canvasWidth) {
      return
    }

    this.x = this.x + INTERVAL
  }

  getColumns() {
    return this.pointList.reduce(
      (colObj, nextpoint) => {
        if (!(nextpoint.x in colObj)) {
          colObj[nextpoint.x] = true
          colObj.result.push(nextpoint.x)
        }

        return colObj
      },
      { result: [] },
    ).result
  }

  update() {
    this.y = this.y + INTERVAL
    this.setPointList()
  }

  draw(context) {
    this.pointList.forEach((point) => {
      context.beginPath()
      context.rect(point.x, point.y, INTERVAL, INTERVAL)
      context.stroke()
      context.fill()
      context.closePath()
    })
  }
}
