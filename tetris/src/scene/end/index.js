import Scene from '../Scene'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../constant'

export default class EndScene extends Scene {
  constructor(app) {
    super(app)

    this.fps = 1
  }

  update() {}

  draw() {
    const {
      app: { context },
    } = this

    context.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    context.stroke()

    context.font = '12px serif'
    context.fillText('游戏结束，刷新重新开始', CANVAS_WIDTH / 2, 50)
  }
}
