import { FLAGGED, UN_FLAGGED, Config, isFlagged } from '../../constant'
import { pointsToPositions, drawRect } from '../../utils'
import { transoform, Transform } from '../../transform'
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
  }

  isEnd() {
    const { flaggedOfMap } = this

    return flaggedOfMap.isEnd()
  }

  isValidTransform(points, actionName) {
    const { flaggedOfMap } = this

    let positions = pointsToPositions(points)
    positions = transoform(positions, actionName)

    return flaggedOfMap.hasFlag(positions)
  }

  mark(points = [], newFlag = FLAGGED) {
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
    const { flaggedOfMap, shape } = this

    flaggedOfMap.updateWithYAxes()
    shape.reset()
  }

  update(delta) {
    const { flaggedOfMap, shape, scene } = this

    if (
      shape.y + shape.height >= Config.CanvasHeight ||
      this.isValidTransform(shape.points, Transform.bottom)
    ) {
      this.mark(shape.points)
      const result = flaggedOfMap.check()

      if (result) {
        scene.animationStart(result)
      } else {
        shape.reset()
      }
    } else {
      shape.update(delta)
    }
  }

  draw(context) {
    const { flaggedOfMap, shape } = this

    for (const y of flaggedOfMap.yAxes) {
      for (const x of flaggedOfMap.xAxes) {
        if (isFlagged(this.flaggedOfMap.getFlag({ x, y }))) {
          drawRect(
            { x: x * Config.sideOfLength, y: y * Config.sideOfLength },
            context,
            false,
          )
        }
      }
    }

    if (flaggedOfMap.isNormal()) {
      shape.draw(context)
    }
  }
}
