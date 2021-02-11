import Scene from '../Scene'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../constant'

export default class EndScene extends Scene {
  constructor(app) {
    super(app)

    this.fps = 20

    // clear the canvas content
    // https://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing
    app.context.canvas.width = canvas.width
  }

  update() {
    this.x++
  }

  draw() {
    const {
      app: { context },
    } = this

    context.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    context.stroke()

    context.font = '16px serif'
    context.fillText('游戏结束，刷新重新开始', 0, 50)
  }
}
