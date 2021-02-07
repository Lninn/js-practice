import { CONFIG, INTERVAL } from './constant'

export default class CellMap {
  constructor() {
    this.pointsForDraw = []
    this.setup()
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new this()
    }

    return this.instance
  }

  setup() {
    const { canvasWidth, canvasHeight } = CONFIG

    const markMap = new Map()

    for (let i = 0; i < canvasWidth; i += INTERVAL) {
      const rowMap = new Map()
      for (let j = 0; j < canvasHeight; j += INTERVAL) {
        rowMap.set(j, 0)
      }
      markMap.set(i, rowMap)
    }

    this.markMap = markMap
  }

  check(points = []) {
    const marks = this.get(points)

    return marks.includes(1)
  }

  get(points = []) {
    return points.map((point) => {
      const { x: rowKey, y: colKey } = point
      const row = this.markMap.get(rowKey)

      if (row === undefined) {
        throw new Error(`Key Error: ${rowKey}`)
      }

      return row.get(colKey)
    })
  }

  set(points = []) {
    points.forEach((point) => {
      const { x: rowKey, y: colKey } = point
      const row = this.markMap.get(rowKey)

      if (row === undefined) {
        throw new Error(`Key Error: ${rowKey}`)
      }

      row.set(colKey, 1)
    })

    this.pointsForDraw = this.pointsForDraw.concat(points)
  }

  draw(context) {
    this.pointsForDraw.forEach((point) => {
      context.beginPath()
      context.rect(point.x, point.y, INTERVAL, INTERVAL)

      const strokeStyle = context.strokeStyle
      context.strokeStyle = '#0095DD'
      context.strokeStyle = strokeStyle

      context.stroke()
      context.fill()
      context.closePath()
    })
  }
}
