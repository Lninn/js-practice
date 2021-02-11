import Scene from '../Scene'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../constant'

export default class EndScene extends Scene {
  constructor(app) {
    super(app)

    this.fps = 20

    // clear the canvas content
    // https://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing
    // for debug
    app.context && (app.context.canvas.width = canvas.width)

    this.renderHtml()
  }

  update() {}

  renderHtml() {
    const container = document.createElement('div')

    document.body.appendChild(container)
  }

  draw() {
    const {
      app: { context },
    } = this

    context.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    context.stroke()
  }
}
