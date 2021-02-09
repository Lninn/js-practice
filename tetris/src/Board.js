import { CONFIG, SIDE_OF_LENGTH } from './constant'
import Drawer from './Drawer'

const BOARD_WIDTH = CONFIG.canvasRows
const BOARD_HEIGHT = CONFIG.canvasColumns

const FLAGGED = 1
const UN_FLAGGED = 0
const isFlagged = (value) => value === FLAGGED

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
    const positions = initPositions(BOARD_WIDTH, BOARD_HEIGHT, 0)
    const xAxes = initXAxes(BOARD_WIDTH)

    this.stateOfPositions = positions
    this.xAxes = xAxes

    this.drawer = new Drawer(this)
  }

  isValidOfPreLeft(positions = []) {
    positions = this.updateHorizontal(positions, false)
    return this.hasFlagged(positions)
  }

  isValidOfPreRight(positions = []) {
    positions = this.updateHorizontal(positions)
    return this.hasFlagged(positions)
  }

  isValidOfPreDown(positions = []) {
    positions = this.updateVertical(positions)
    return this.hasFlagged(positions)
  }

  isValidOfPreTranspose(positions = []) {
    return this.hasFlagged(positions)
  }

  hasFlagged(positions = []) {
    return this.getFlags(positions).some((flag) => isFlagged(flag))
  }

  updateHorizontal(positions = [], isPotive = true) {
    return positions.map((pos) => {
      return {
        ...pos,
        x: pos.x + (isPotive ? 1 : -1),
      }
    })
  }

  updateVertical(positions = [], isPotive = true) {
    return positions.map((pos) => {
      return {
        ...pos,
        y: pos.y + (isPotive ? 1 : -1),
      }
    })
  }

  getFlags(positions = []) {
    const { stateOfPositions } = this

    return positions.map((pos) => {
      const { x, y } = pos

      return stateOfPositions[y][x]
    })
  }

  updateFlagWithPoints(points = [], newFlag = 1) {
    const positions = pointsToPositions(points)
    this.setFlag(positions, newFlag)

    this.drawer.addPoints(points)
  }

  setFlag(positions = [], newFlag = 1) {
    const { stateOfPositions } = this

    positions.forEach((position) => {
      stateOfPositions.setState(position, newFlag)
    })
  }

  updateFlag() {
    const { xAxes } = this
    const flaggedYAxes = this.getFlaggedOfYAxes()

    if (flaggedYAxes.length) {
      const updatedPositions = flaggedYAxes.map((y) => {
        return xAxes.map((x) => ({ x, y }))
      })

      updatedPositions.forEach((positions) => {
        this.setFlag(positions, 0)
      })

      this.drawer.update(flaggedYAxes)
    }
  }

  getFlaggedOfYAxes() {
    const { stateOfPositions } = this

    const flaggedYAxes = []
    for (let i = 0; i < BOARD_HEIGHT; i++) {
      let isPassed = false

      for (let j = 0; j < BOARD_WIDTH; j++) {
        if (!isFlagged(stateOfPositions[i][j])) {
          isPassed = false
          break
        } else {
          isPassed = true
        }
      }

      if (isPassed) {
        flaggedYAxes.push(i)
      }
    }

    return flaggedYAxes
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

    this[y][x] = newState
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
    return { x: x / SIDE_OF_LENGTH, y: y / SIDE_OF_LENGTH }
  }

  return points.map(pointToPosition)
}
