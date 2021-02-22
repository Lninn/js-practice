import { FLAGGED, UN_FLAGGED, Config } from '../../constant'
import { createNumbers, pointsToPositions, drawRect } from '../../utils'

export default class Board {
  constructor(scene) {
    this.setup()

    this.scene = scene
  }

  setup() {
    this.flaggedOfMap = createMap(
      Config.BoardWidth,
      Config.BoardHeight,
      UN_FLAGGED,
    )
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

    return this.isValidPosition(positions)
  }

  isValidOfPreRight(points = []) {
    let positions = pointsToPositions(points)
    positions = this.updateHorizontal(positions)

    return this.isValidPosition(positions)
  }

  isValidOfPreDown(points = []) {
    let positions = pointsToPositions(points)
    positions = this.updateVertical(positions)

    return this.isValidPosition(positions)
  }

  isValidOfPreTranspose(points = []) {
    let positions = pointsToPositions(points)

    return this.isValidPosition(positions)
  }

  isValidPosition(positions = []) {
    const { flaggedOfMap } = this

    return flaggedOfMap.hasFlag(positions)
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
    const { flaggedOfMap } = this

    const positions = pointsToPositions(points)
    flaggedOfMap.setFlags(positions, newFlag)
  }

  updateFlag(positionsList, newFlag) {
    const { flaggedOfMap } = this

    positionsList.forEach((positions) => {
      flaggedOfMap.setFlags(positions, newFlag)
    })
  }

  updateWithYAxes(flaggedYAxes) {
    const { flaggedOfMap } = this
    const { xAxes, yAxes } = flaggedOfMap

    const minYAxis = Math.min(...flaggedYAxes)
    let positions = []
    for (const y of yAxes) {
      for (const x of xAxes) {
        if (isFlagged(flaggedOfMap.getFlag({ x, y })) && y <= minYAxis) {
          positions.push({ x, y })
        }
      }
    }

    flaggedYAxes.forEach((_) => {
      flaggedOfMap.setFlags(positions, UN_FLAGGED)
      positions = positions.map((position) => {
        if (position.y === Config.BoardHeight - 1) {
          return position
        }

        return {
          ...position,
          y: position.y + 1,
        }
      })

      flaggedOfMap.setFlags(positions, FLAGGED)
    })
  }

  getFlaggedOfYAxes() {
    const { flaggedOfMap } = this

    const flaggedYAxes = []
    for (const y of flaggedOfMap.yAxes) {
      let isPassed = false

      for (const x of flaggedOfMap.xAxes) {
        if (!isFlagged(flaggedOfMap.getFlag({ x, y }))) {
          isPassed = false
          break
        } else {
          isPassed = true
        }
      }

      if (isPassed) {
        flaggedYAxes.push(y)
      }
    }

    return flaggedYAxes
  }

  draw(context) {
    const { flaggedOfMap } = this
    const flaggedYAxes = this.getFlaggedOfYAxes()

    for (const y of flaggedOfMap.yAxes) {
      for (const x of flaggedOfMap.xAxes) {
        if (
          isFlagged(this.flaggedOfMap.getFlag({ x, y })) &&
          !flaggedYAxes.includes(y)
        ) {
          drawRect(
            { x: x * Config.sideOfLength, y: y * Config.sideOfLength },
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

function createMap(width, height, flag) {
  const map = []

  for (let col = 0; col < height; col++) {
    map[col] = []
    for (let row = 0; row < width; row++) {
      map[col][row] = flag
    }
  }

  function hasFlag(positions = []) {
    const flags = getFlags(positions)

    return flags.some((flag) => isFlagged(flag))
  }

  function getFlags(positions = []) {
    return positions.map(getFlag)
  }

  function setFlags(positions = [], newFlag) {
    positions.forEach((position) => {
      setFlag(position, newFlag)
    })
  }

  function getFlag(position) {
    const { x, y } = position

    return map[y][x]
  }

  function setFlag(position, newFlag) {
    const { x, y } = position

    map[y][x] = newFlag
  }

  return {
    xAxes: createNumbers(width),
    yAxes: createNumbers(height),

    getFlag,
    setFlag,
    getFlags,
    setFlags,
    hasFlag,
  }
}
