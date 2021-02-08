import { CONFIG, INTERVAL } from './constant'

function createPositions(numOfRow, numOfCol, initState) {
  const table = []

  for (let i = 0; i < numOfCol; i++) {
    table[i] = []
    for (let j = 0; j < numOfRow; j++) {
      table[i][j] = initState
    }
  }

  return table
}

function pointsToPositions(points = []) {
  const pointToPosition = (point) => {
    const { x, y } = point
    return { x: x / INTERVAL, y: y / INTERVAL }
  }

  return points.map(pointToPosition)
}

export default class PositionMap {
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
    const { canvasRows, canvasColumns } = CONFIG

    const xAxes = []
    for (let i = 0; i < canvasRows; i++) {
      xAxes.push(i)
    }

    const positions = createPositions(canvasRows, canvasColumns, 0)
    this.stateOfPositions = positions
    this.xAxes = xAxes
  }

  check(points = []) {
    const states = this.getStateWithPoints(points)
    return states.includes(1)
  }

  getStateWithPoints(points = []) {
    const { stateOfPositions } = this
    const positions = pointsToPositions(points)

    return positions.map((position) => {
      return stateOfPositions[position.y][position.x]
    })
  }

  setStateWithPoints(points = [], newState = 1) {
    const positions = pointsToPositions(points)
    this.setStateWithPositions(positions, newState)

    this.pointsForDraw = this.pointsForDraw.concat(points)
  }

  setStateWithPositions(positions = [], newState = 1) {
    const { stateOfPositions } = this

    positions.forEach((position) => {
      stateOfPositions[position.y][position.x] = newState
    })
  }

  update() {
    const { stateOfPositions, xAxes } = this
    const numOfCol = stateOfPositions.length
    const numOfRow = stateOfPositions[0].length

    const updatedYAxes = []
    let state = null
    for (let i = 0; i < numOfCol; i++) {
      let isPassed = false

      for (let j = 0; j < numOfRow; j++) {
        state = stateOfPositions[i][j]
        if (state === 0) {
          isPassed = false
          break
        } else {
          isPassed = true
        }
      }

      if (isPassed) {
        updatedYAxes.push(i)
      }
    }

    console.log(updatedYAxes)

    if (updatedYAxes.length) {
      updatedYAxes
        .map((y) => {
          return xAxes.map((x) => ({ x, y }))
        })
        .forEach((positions) => {
          this.setStateWithPositions(positions, 0)
        })

      let updatedPoints = this.pointsForDraw
      updatedYAxes.forEach((y) => {
        updatedPoints = updatedPoints.filter((point) => {
          return point.y !== y * INTERVAL
        })
      })

      updatedYAxes.forEach((y) => {
        this.setStateWithPoints(updatedPoints, 0)
        updatedPoints = updatedPoints.map((point) => {
          return {
            ...point,
            y: point.y + INTERVAL,
          }
        })
        this.setStateWithPoints(updatedPoints, 1)
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
