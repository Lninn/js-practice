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
    const columns = []

    for (let j = 0; j < canvasWidth; j += INTERVAL) {
      columns.push(j)
    }

    for (let i = 0; i < canvasHeight; i += INTERVAL) {
      const colMap = new Map()
      for (let j = 0; j < canvasWidth; j += INTERVAL) {
        colMap.set(j, 0)
      }
      markMap.set(i, colMap)
    }

    this.markMap = markMap
    this.columns = columns
  }

  check(points = []) {
    const marks = this.get(points)

    return marks.includes(1)
  }

  get(points = []) {
    return points.map((point) => {
      const { x: rowKey, y: colKey } = point
      const col = this.markMap.get(colKey)

      if (col === undefined) {
        throw new Error(`Key Error: ${rowKey}`)
      }

      return col.get(rowKey)
    })
  }

  set(points = [], value = 1) {
    points.forEach((point) => {
      const { x: rowKey, y: colKey } = point
      const col = this.markMap.get(colKey)

      if (col === undefined) {
        throw new Error(`Key Error: ${colKey}`)
      }

      col.set(rowKey, value)
    })

    this.pointsForDraw = this.pointsForDraw.concat(points)
  }

  update() {
    const { markMap, columns } = this
    const list = Array.from(markMap.entries())

    const updatedRows = []
    for (const [keyOfRow, rowMap] of list) {
      let isPassed = false

      for (const [keyOfCol, value] of Array.from(rowMap.entries())) {
        if (value === 0) {
          isPassed = false
          break
        } else {
          isPassed = true
        }
      }

      if (isPassed) {
        updatedRows.push(keyOfRow)
      }
    }

    if (updatedRows.length) {
      const rowOfLines = updatedRows.map((row) => {
        return columns.map((col) => ({ x: col, y: row }))
      })
      rowOfLines.forEach((updatePoints) => {
        this.set(updatePoints, 0)
      })

      let drawPoints = this.pointsForDraw
      updatedRows.forEach((updateRow) => {
        drawPoints = drawPoints.filter((point) => {
          return point.y !== updateRow
        })
      })

      updatedRows.forEach((row) => {
        this.set(drawPoints, 0)
        drawPoints = drawPoints.map((point) => {
          return {
            ...point,
            y: point.y + INTERVAL,
          }
        })
        this.set(drawPoints, 1)
      })
      this.pointsForDraw = drawPoints
    }
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
