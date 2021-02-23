import { Config } from '../../constant'
import { drawRect } from '../../utils'

export default class Animation {
  constructor(scene) {
    this.scene = scene

    this.init()
  }

  init() {
    this.timer = performance.now()
    this.fps = 10

    this.reset()
  }

  start(positionsList = []) {
    const s = Config.sideOfLength

    const points = []
    for (const positions of positionsList) {
      for (const position of positions) {
        points.push({
          x: position.x * s,
          y: position.y * s,
        })
      }
    }

    this.points = points
    this.numOfStar = 10
  }

  update(delta) {
    this.timer += delta

    if (this.timer >= 1000 / this.fps) {
      this._update()
      this.timer = 0
    }
  }

  _update() {
    if (this.numOfStar < 0) {
      this.reset()
      this.scene.recover()
    } else {
      this.numOfStar -= 1
    }
  }

  reset() {
    this.numOfStar = -1
    this.points = []
  }

  isAnimation() {
    return this.numOfStar > 0
  }

  draw(context) {
    if (this.numOfStar > 0 && this.numOfStar % 2 === 0) {
      for (const point of this.points) {
        drawRect(point, context, true)
      }
    }
  }
}
