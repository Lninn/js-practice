import { FLAGGED, UN_FLAGGED, Config } from '../../constant'
import { createNumbers, pointsToPositions, drawRect } from '../../utils'

export default class Board {
  constructor(scene) {
    this.setup()
    this.scene = scene
  }

  setup() {
    const flaggedOfMap = []

    for (let i = 0; i < Config.BoardHeight; i++) {
      flaggedOfMap[i] = []
      for (let j = 0; j < Config.BoardWidth; j++) {
        flaggedOfMap[i][j] = UN_FLAGGED
      }
    }

    this.flaggedOfMap = flaggedOfMap
    this.xAxes = createNumbers(Config.BoardWidth)
    this.yAxes = createNumbers(Config.BoardHeight)
  }

  isEnd() {
    const { yAxes, xAxes } = this
    const topIndex = yAxes[0]
    const positions = xAxes.map((x) => ({ x, y: topIndex }))
    const flags = this.getFlags(positions)

    return flags.some((flag) => isFlagged(flag))
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

  updateWithYAxes(flaggedYAxes) {
    const { xAxes, yAxes, flaggedOfMap } = this

    const minYAxis = Math.min(...flaggedYAxes)
    let positions = []
    for (const col of yAxes) {
      for (const row of xAxes) {
        if (isFlagged(flaggedOfMap[col][row]) && col <= minYAxis) {
          positions.push({ x: row, y: col })
        }
      }
    }

    flaggedYAxes.forEach((_) => {
      this.updateFlag(positions, UN_FLAGGED)
      positions = positions.map((position) => {
        if (position.y === Config.BoardHeight - 1) {
          return position
        }

        return {
          ...position,
          y: position.y + 1,
        }
      })

      this.updateFlag(positions, FLAGGED)
    })
  }

  getFlaggedOfYAxes() {
    const { flaggedOfMap } = this

    const flaggedYAxes = []
    for (let i = 0; i < Config.BoardHeight; i++) {
      let isPassed = false

      for (let j = 0; j < Config.BoardWidth; j++) {
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
    const flaggedYAxes = this.getFlaggedOfYAxes()

    for (const col of this.yAxes) {
      for (const row of this.xAxes) {
        if (
          isFlagged(this.flaggedOfMap[col][row]) &&
          !flaggedYAxes.includes(col)
        ) {
          drawRect(
            { x: row * Config.sideOfLength, y: col * Config.sideOfLength },
            context,
            false,
          )
        }
      }
    }
  }
}

export function isFlagged(value) {
  return value === FLAGGED
}
