import { BOARD_WIDTH, BOARD_HEIGHT, FLAGGED } from './constant'
import Drawer from './Drawer'
import { pointsToPositions } from './Shape'

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

  updateFlagWithPoints(points = [], newFlag = FLAGGED) {
    const positions = pointsToPositions(points)
    this.setFlag(positions, newFlag)

    this.drawer.addPoints(points)

    this.updateWithYAxes()
  }

  getFlags(positions = []) {
    const { stateOfPositions } = this

    return positions.map((pos) => {
      const { x, y } = pos

      return stateOfPositions[y][x]
    })
  }

  setFlag(positions = [], newFlag = FLAGGED) {
    const { stateOfPositions } = this

    positions.forEach((position) => {
      stateOfPositions.setState(position, newFlag)
    })
  }

  updateWithYAxes() {
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

  function setState(position = {}, newState = 0) {
    const { x, y } = position

    this[y][x] = newState
  }

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

function isFlagged(value) {
  return value === FLAGGED
}
