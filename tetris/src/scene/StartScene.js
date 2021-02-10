import Animation from './Animation'
import Scene from './Scene'

export default class StartScene extends Scene {
  constructor(app) {
    super(app)

    this.setup()
  }

  setup() {
    this.fps = 20
    this.animation = new Animation()
  }

  update() {
    this.animation.update()
  }

  draw() {
    const { app } = this
    this.animation.draw(app.context)
  }
}
