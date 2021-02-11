import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  FLAGGED,
  UN_FLAGGED,
  SIDE_OF_LENGTH,
  Config,
} from '../../constant'
import { createNumbers } from '../../utils'

export default class Board {
  constructor(scene) {
    this.setup()
    this.scene = scene
  }

  static getInstance(...args) {
    if (!this.instance) {
      this.instance = new this(...args)
    }

    return this.instance
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

      let positions = []
      for (const col of this.yAxes) {
        for (const row of this.xAxes) {
          if (
            isFlagged(this.flaggedOfMap[col][row]) &&
            !flaggedYAxes.includes(col)
          ) {
            positions.push({ x: row, y: col })
          }
        }
      }

      this.updateFlag(positions, UN_FLAGGED)
      flaggedYAxes.forEach((_) => {
        positions = positions.map((position) => {
          // trail is 19 if Max countOfCol eq 20
          // the last is 19 * step
          if (position.y === BOARD_HEIGHT - 1) {
            return position
          }

          return {
            ...position,
            y: position.y + 1,
          }
        })
      })

      this.updateFlag(positions, FLAGGED)
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
    const strokeStyle = context.strokeStyle
    const fillStyle = context.fillStyle

    const {
      scene: { animation },
    } = this

    const flaggedYAxes = this.getFlaggedOfYAxes()

    for (const col of this.yAxes) {
      for (const row of this.xAxes) {
        if (isFlagged(this.flaggedOfMap[col][row])) {
          if (animation.isAnimation && flaggedYAxes.includes(col)) {
            if (animation.displayOnFrame()) {
              drawRect(
                { x: row * SIDE_OF_LENGTH, y: col * SIDE_OF_LENGTH },
                context,
              )
            }
          } else {
            drawRect(
              { x: row * SIDE_OF_LENGTH, y: col * SIDE_OF_LENGTH },
              context,
            )
          }
        }
      }
    }

    context.strokeStyle = strokeStyle
    context.fillStyle = fillStyle
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

function drawRect(point, context) {
  const strokeStyle = context.strokeStyle
  const fillStyle = context.fillStyle

  context.beginPath()
  context.rect(point.x, point.y, SIDE_OF_LENGTH, SIDE_OF_LENGTH)

  context.strokeStyle = Config.shape.strokeStyle
  context.fillStyle = Config.shape.fillStyle

  context.stroke()
  context.fill()
  context.closePath()

  context.strokeStyle = strokeStyle
  context.fillStyle = fillStyle
}
