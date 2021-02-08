import { CONFIG, INTERVAL } from './constant'
import Drawer from './Drawer'

export default class Board {
  constructor() {
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

    const positions = initPositions(canvasRows, canvasColumns, 0)
    const xAxes = initXAxes(canvasRows)

    this.stateOfPositions = positions
    this.xAxes = xAxes

    this.drawer = new Drawer(this)
  }

  check(points = []) {
    const states = this.getStateWithPoints(points)
    return states.includes(1)
  }

  getStateWithPoints(points = []) {
    const { stateOfPositions } = this
    const positions = pointsToPositions(points)

    return positions.map((position) => {
      return stateOfPositions.getState(position)
    })
  }

  setStateWithPoints(points = [], newState = 1) {
    const positions = pointsToPositions(points)
    this.setStateWithPositions(positions, newState)

    this.drawer.addPoints(points)
  }

  setStateWithPositions(positions = [], newState = 1) {
    const { stateOfPositions } = this

    positions.forEach((position) => {
      stateOfPositions.setState(position, newState)
    })
  }

  update() {
    const { xAxes } = this
    const updatedYAxes = this.getUpdatedPositionYIndexs()

    if (updatedYAxes.length) {
      const updatedPositions = updatedYAxes.map((y) => {
        return xAxes.map((x) => ({ x, y }))
      })

      updatedPositions.forEach((positions) => {
        this.setStateWithPositions(positions, 0)
      })

      this.drawer.update(updatedYAxes)
    }
  }

  getUpdatedPositionYIndexs() {
    const { stateOfPositions } = this

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

    return updatedYAxes
  }

  draw(context) {
    this.drawer.draw(context)
  }
}

function initPositions(numOfRow, numOfCol, initState) {
  // 二维数组
  const positions = []

  for (let i = 0; i < numOfCol; i++) {
    positions[i] = []
    for (let j = 0; j < numOfRow; j++) {
      positions[i][j] = initState
    }
  }

  function getState(position = {}) {
    const { x, y } = position

    return this[y][x]
  }

  function setState(position = {}, newState = 0) {
    const { x, y } = position

    try {
      this[y][x] = newState
    } catch (errorInfo) {
      console.log({
        errorInfo,
        obj: this,
        position,
      })
    }
  }

  positions.getState = getState
  positions.setState = setState

  return positions
}

function initXAxes(numOfRow) {
  const xAxes = []

  for (let i = 0; i < numOfRow; i++) {
    xAxes.push(i)
  }

  return xAxes
}

function pointsToPositions(points = []) {
  const pointToPosition = (point) => {
    const { x, y } = point
    return { x: x / INTERVAL, y: y / INTERVAL }
  }

  return points.map(pointToPosition)
}
