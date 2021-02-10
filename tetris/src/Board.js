import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  FLAGGED,
  UN_FLAGGED,
  SIDE_OF_LENGTH,
} from './constant'
import Drawer from './Drawer'
import { createNumbers } from './utils'

export default class Board {
  constructor() {
    this.init()

    this.setup()
  }

  static getInstance(...args) {
    if (!this.instance) {
      this.instance = new this(...args)
    }

    return this.instance
  }

  init() {
    const drawer = Drawer.getInstance(this)
    this.drawer = drawer
  }

  setup() {
    const flaggedOfMap = []

    for (let i = 0; i < BOARD_HEIGHT; i++) {
      flaggedOfMap[i] = []
      for (let j = 0; j < BOARD_WIDTH; j++) {
        flaggedOfMap[i][j] = UN_FLAGGED
      }
    }

    this.flaggedOfMap = flaggedOfMap
    this.xAxes = createNumbers(BOARD_WIDTH)
    this.yAxes = createNumbers(BOARD_HEIGHT)
  }

  isValidOfPreLeft(points = []) {
    let positions = pointsToPositions(points)
    positions = this.updateHorizontal(positions, false)
    return this.hasFlag(positions)
  }

  isValidOfPreRight(points = []) {
    let positions = pointsToPositions(points)
    positions = this.updateHorizontal(positions)
    return this.hasFlag(positions)
  }

  isValidOfPreDown(points = []) {
    let positions = pointsToPositions(points)
    positions = this.updateVertical(positions)
    return this.hasFlag(positions)
  }

  isValidOfPreTranspose(points = []) {
    let positions = pointsToPositions(points)
    return this.hasFlag(positions)
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

  hasFlag(positions = []) {
    const flags = this.getFlags(positions)
    return flags.some((flag) => isFlagged(flag))
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

      // 直接替换当前的场景，并且保存上一个场景
      // 这是一个临时的场景
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

function pointsToPositions(points = []) {
  const pointToPosition = (point) => {
    const { x, y } = point
    return { x: x / SIDE_OF_LENGTH, y: y / SIDE_OF_LENGTH }
  }

  return points.map(pointToPosition)
}

export function isFlagged(value) {
  return value === FLAGGED
}
