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

    const stateMap = new Map()
    const numOfXAxis = []

    for (let j = 0; j < canvasWidth; j += INTERVAL) {
      numOfXAxis.push(j)
    }

    for (let i = 0; i < canvasHeight; i += INTERVAL) {
      const colMap = new Map()
      for (let r = 0; r < canvasWidth; r += INTERVAL) {
        colMap.set(r, 0)
      }
      stateMap.set(i, colMap)
    }

    this.stateMap = stateMap
    this.numOfXAxis = numOfXAxis
  }

  check(points = []) {
    const marks = this.get(points)

    return marks.includes(1)
  }

  get(points = []) {
    return points.map((point) => {
      const { x: rowKey, y: colKey } = point
      const col = this.stateMap.get(colKey)

      if (col === undefined) {
        throw new Error(`Key Error: ${rowKey}`)
      }

      return col.get(rowKey)
    })
  }

  set(points = [], value = 1) {
    points.forEach((point) => {
      const { x: rowKey, y: colKey } = point
      const col = this.stateMap.get(colKey)

      if (col === undefined) {
        throw new Error(`Key Error: ${colKey}`)
      }

      col.set(rowKey, value)
    })

    this.pointsForDraw = this.pointsForDraw.concat(points)
  }

  update() {
    const { stateMap, numOfXAxis } = this
    const rowOfList = Array.from(stateMap.entries())

    const updatedYAxes = []
    for (const [yAxis, rowOfMap] of rowOfList) {
      let isPassed = false

      for (const [xAxis, value] of Array.from(rowOfMap.entries())) {
        if (value === 0) {
          isPassed = false
          break
        } else {
          isPassed = true
        }
      }

      if (isPassed) {
        updatedYAxes.push(yAxis)
      }
    }

    if (updatedYAxes.length) {
      updatedYAxes
        .map((y) => {
          return numOfXAxis.map((x) => ({ x, y }))
        })
        .forEach((rowOfpoints) => {
          this.set(rowOfpoints, 0)
        })

      let updatedPoints = this.pointsForDraw
      updatedYAxes.forEach((y) => {
        updatedPoints = updatedPoints.filter((point) => {
          return point.y !== y
        })
      })

      updatedYAxes.forEach((y) => {
        this.set(updatedPoints, 0)
        updatedPoints = updatedPoints.map((point) => {
          return {
            ...point,
            y: point.y + INTERVAL,
          }
        })
        this.set(updatedPoints, 1)
      })
      this.pointsForDraw = updatedPoints
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
