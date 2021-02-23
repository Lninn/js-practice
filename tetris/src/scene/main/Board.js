import { FLAGGED, UN_FLAGGED, Config, isFlagged } from '../../constant'
import { pointsToPositions, drawRect } from '../../utils'
import { transoform } from '../../transform'
import { createMap } from '../../map'
import Shape from './Shape'

export default class Board {
  constructor(scene) {
    this.scene = scene

    this.setup()
  }

  setup() {
    this.flaggedOfMap = createMap(
      Config.BoardWidth,
      Config.BoardHeight,
      UN_FLAGGED,
    )

    this.shape = new Shape(this)
    this.scene.register(this.shape)

    // for animation
    this.indexs = []
  }

  isValidTransform(points, actionName) {
    const { flaggedOfMap } = this

    let positions = pointsToPositions(points)
    positions = transoform(positions, actionName)

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

  updateWithYAxes() {
    const flaggedYAxes = this.indexs

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

    this.shape.reset()
    this.indexs = []
  }

  update(delta) {
    const { flaggedOfMap, shape, scene } = this

    if (
      shape.y + shape.height >= Config.CanvasHeight ||
      shape.isValidOfPreDown()
    ) {
      this.updateFlagWithPoints(shape.points)

      const indexs = flaggedOfMap.getContinuousLineOfIndex()
      this.indexs = indexs
      if (indexs.length) {
        const positionsList = indexs.map((y) => {
          return flaggedOfMap.xAxes.map((x) => ({ x, y }))
        })
        this.updateFlag(positionsList, UN_FLAGGED)
        scene.animationStart(positionsList)
      } else {
        shape.reset()
      }
    } else {
      shape.update(delta)
    }
  }

  isEnd() {
    return this.flaggedOfMap.isEnd()
  }

  isNormal() {
    return !this.indexs.length
  }

  draw(context) {
    const { flaggedOfMap, shape } = this
    const flaggedYAxes = flaggedOfMap.getContinuousLineOfIndex()

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

    if (this.isNormal()) {
      shape.draw(context)
    }
  }
}
