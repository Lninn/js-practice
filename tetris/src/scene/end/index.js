import Scene from '../Scene'
import { Config } from '../../constant'
import StartScene from '../start'

export default class EndScene extends Scene {
  constructor(app) {
    super(app)

    this.fps = 20

    // clear the canvas content
    // https://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing
    // for debug
    app.context && (app.context.canvas.width = canvas.width)

    this.setup()
    this.renderHtml()
  }

  setup() {
    const self = this
    const restartBtn = document.getElementById('restart')
    restartBtn.onclick = function () {
      const endElement = document.getElementById('end-scene')
      endElement.style.display = 'none'
      self.app.replaceScene(new StartScene(self.app))
    }
  }

  update() {}

  renderHtml() {
    const {
      app: { context },
    } = this

    const rect = context.canvas.getBoundingClientRect()
    const endElement = document.getElementById('end-scene')

    endElement.style.display = 'block'
    endElement.style.left = rect.left
    endElement.style.width = rect.width + 'px'
    endElement.style.height = rect.height + 'px'
  }

  draw() {
    const {
      app: { context },
    } = this

    context.rect(0, 0, Config.CanvasWidth, Config.CanvasHeight)
    context.stroke()
  }
}
