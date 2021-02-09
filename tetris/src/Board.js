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
    const positions = []
    const xAxes = []

    for (let i = 0; i < BOARD_HEIGHT; i++) {
      positions[i] = []
      for (let j = 0; j < BOARD_WIDTH; j++) {
        positions[i][j] = FLAGGED
      }
    }

    for (let i = 0; i < BOARD_WIDTH; i++) {
      xAxes.push(i)
    }

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

  // TODO
  // 逻辑尽量分开
  updateFlagWithPoints(points = [], newFlag = FLAGGED) {
    const positions = pointsToPositions(points)
    this.setFlag(positions, newFlag)

    this.drawer.addPoints(points)
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

    positions.forEach((pos) => {
      stateOfPositions[pos.y][pos.x] = newFlag
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

function initXAxes(numOfRow) {
  const xAxes = []

  return xAxes
}

export function isFlagged(value) {
  return value === FLAGGED
}
