import Animation from './Animation'
import Scene from '../Scene'
import GameScene, { drawBoard } from '../main'

export default class StartScene extends Scene {
  constructor(app) {
    super(app)

    this.setup()
  }

  start() {
    const { app } = this

    app.replaceScene(new GameScene(app))
  }

  setup() {
    this.animation = new Animation(this)

    this.timer = performance.now()
    this.fps = 10
  }

  update(delta) {
    this.timer += delta

    if (this.timer >= 1000 / this.fps) {
      this.animation.update()

      this.timer = 0
    }
  }

  draw() {
    const {
      app: { context },
    } = this

    this.animation.draw(context)

    drawBoard(context)
  }
}
