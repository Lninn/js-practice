import Animation from './Animation'
import Scene from '../Scene'
import GameScene from '../main'

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
    const { app } = this

    app.setFps(30)
    this.animation = new Animation(this)
  }

  update() {
    this.animation.update()
  }

  draw() {
    const { app } = this

    this.animation.draw(app.context)
  }
}
