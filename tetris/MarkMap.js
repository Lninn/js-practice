import { CONFIG, INTERVAL } from './constant'

export default class MarkMap {
  constructor() {
    this.drawPoints = []
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

  getValue(point) {
    const { x: rowKey, y: colKey } = point
    const row = this.markMap.get(rowKey)

    if (row === undefined) {
      throw new Error(`Key Error: ${rowKey}`)
    }

    return row.get(colKey)
  }

  getValueWithPoints(points = []) {
    return points.map(this.getValue, this)
  }

  setValue(point, value) {
    const { x: rowKey, y: colKey } = point

    const row = this.markMap.get(rowKey)

    if (row === undefined) {
      throw new Error(`Key Error: ${rowKey}`)
    }

    row.set(colKey, value)
    this.drawPoints.push(point)
  }
}
