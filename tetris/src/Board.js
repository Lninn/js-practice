import { BOARD_WIDTH, BOARD_HEIGHT, FLAGGED, UN_FLAGGED } from './constant'
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
    const flaggedOfMap = []
    const xAxes = []

    for (let i = 0; i < BOARD_HEIGHT; i++) {
      flaggedOfMap[i] = []
      for (let j = 0; j < BOARD_WIDTH; j++) {
        flaggedOfMap[i][j] = UN_FLAGGED
      }
    }

    for (let i = 0; i < BOARD_WIDTH; i++) {
      xAxes.push(i)
    }

    this.flaggedOfMap = flaggedOfMap
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
    const flags = this.getFlags(positions)
    return flags.some((flag) => isFlagged(flag))
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
    this.drawer.addPoints(points)

    const positions = pointsToPositions(points)
    this.updateFlag(positions, newFlag)
  }

  getFlags(positions = []) {
    const { flaggedOfMap } = this

    return positions.map(({ x, y }) => {
      return flaggedOfMap[y][x]
    })
  }

  updateFlag(positions = [], newFlag = FLAGGED) {
    const { flaggedOfMap } = this

    positions.forEach(({ x, y }) => {
      flaggedOfMap[y][x] = newFlag
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
        this.updateFlag(positions, 0)
      })

      this.drawer.update(flaggedYAxes)
    }
  }

  getFlaggedOfYAxes() {
    const { flaggedOfMap } = this

    const flaggedYAxes = []
    for (let i = 0; i < BOARD_HEIGHT; i++) {
      let isPassed = false

      for (let j = 0; j < BOARD_WIDTH; j++) {
        if (!isFlagged(flaggedOfMap[i][j])) {
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

export function isFlagged(value) {
  return value === FLAGGED
}
