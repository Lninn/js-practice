import { FLAGGED, UN_FLAGGED, Config, isFlagged } from '../../constant'
import { pointsToPositions, drawRect } from '../../utils'
import { transoform } from '../../transform'
import { createMap } from '../../map'

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
    const { yAxes, xAxes } = this.flaggedOfMap
    const topIndex = yAxes[0]
    const positions = xAxes.map((x) => ({ x, y: topIndex }))
    const flags = this.flaggedOfMap.getFlags(positions)

    return flags.some((flag) => isFlagged(flag))
  }

  isValidTransform(points, actionName) {
    let positions = pointsToPositions(points)
    positions = transoform(positions, actionName)

    return this.isValidPosition(positions)
  }

  isValidPosition(positions = []) {
    const { flaggedOfMap } = this

    return flaggedOfMap.hasFlag(positions)
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

  getContinuousLineOfIndex() {
    return this.flaggedOfMap.getContinuousLineOfIndex()
  }

  draw(context) {
    const { flaggedOfMap } = this
    const flaggedYAxes = this.getContinuousLineOfIndex()

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
