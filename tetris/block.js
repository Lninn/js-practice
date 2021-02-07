import { CONFIG, ORIGINAL_POINT, INTERVAL } from './constant'
import { transpose, getRandomBlock } from './utils'

import MarkMap from './MarkMap'

const markMap = MarkMap.getInstance()

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

  transpose() {
    const { canvasWidth, canvasHeight } = CONFIG

    const newBlock = transpose(this.block)
    const { width, height } = this.getSize(newBlock)

    if (this.x + width > canvasWidth || this.y + height > canvasHeight) {
      return
    }

    // TODO 边界检测
    const points = this.getPointList(newBlock)
    const values = points.map((point) => {
      return markMap.getValue(point)
    })

    if (values.includes(1)) {
      return
    }

    this.width = width
    this.height = height

    this.block = newBlock
    this.setPointList()
  }

  moveUp() {
    this.y = this.y - INTERVAL
    this.setPointList()
  }

  moveLeft() {
    if (this.x <= 0) {
      return
    }

    const rowPoint = this.getRowsForLeft().map((point) => {
      return {
        ...point,
        x: point.x - INTERVAL,
      }
    })

    const values = rowPoint.map((point) => {
      return markMap.getValue(point)
    })

    if (values.includes(1)) {
      return
    }

    this.x = this.x - INTERVAL
    this.setPointList()
  }

  moveRight() {
    const { canvasWidth } = CONFIG

    if (this.x + this.width >= canvasWidth) {
      return
    }

    const rowPoint = this.getRowsForRight().map((point) => {
      return {
        ...point,
        x: point.x + INTERVAL,
      }
    })

    const values = rowPoint.map((point) => {
      return markMap.getValue(point)
    })

    if (values.includes(1)) {
      return
    }

    this.x = this.x + INTERVAL
    this.setPointList()
  }

  getColumns() {
    const obj = this.pointList.reduce((collect, nextpoint) => {
      const { x } = nextpoint
      const target = collect[x]

      if (target === undefined) {
        collect[x] = nextpoint
      } else {
        collect[x] = target.y > nextpoint.y ? target : nextpoint
      }

      return collect
    }, {})

    return Object.entries(obj).map(([_, e]) => e)
  }

  getRowsForLeft() {
    const obj = this.pointList.reduce((collect, nextPoint) => {
      const { y } = nextPoint
      const target = collect[y]

      if (target === undefined) {
        collect[y] = nextPoint
      } else {
        collect[y] = target.x < nextPoint.x ? target : nextPoint
      }

      return collect
    }, {})

    return Object.entries(obj).map(([_, e]) => e)
  }

  getRowsForRight() {
    const obj = this.pointList.reduce((collect, nextPoint) => {
      const { y } = nextPoint
      const target = collect[y]

      if (target === undefined) {
        collect[y] = nextPoint
      } else {
        collect[y] = target.x > nextPoint.x ? target : nextPoint
      }

      return collect
    }, {})

    return Object.entries(obj).map(([_, e]) => e)
  }

  update() {
    if (collision(this)) {
      this.pointList.forEach((point) => {
        markMap.setValue(point, 1)
      })

      this.reset()
    } else {
      this.y = this.y + INTERVAL
      this.setPointList()
    }
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

  getPointList(block) {
    const indexPoints = []

    block.forEach((outerElement, outerIndex) => {
      outerElement.forEach((innerElement, innerIndex) => {
        innerElement === 1 && indexPoints.push({ x: innerIndex, y: outerIndex })
      })
    })

    return indexPoints.map((point) => {
      const x = this.x + INTERVAL * point.x
      const y = this.y + INTERVAL * point.y

      return { x, y }
    })
  }

  draw(context) {
    this.pointList.forEach((point) => {
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

function collision(block) {
  if (block.y + block.height >= CONFIG.canvasHeight) {
    return true
  }

  // check current block columns
  const colPoints = block.getColumns().map((point) => {
    return {
      ...point,
      y: point.y + INTERVAL,
    }
  })

  const values = colPoints.map((point) => {
    return markMap.getValue(point)
  })

  if (values.includes(1)) {
    return true
  }

  return false
}
