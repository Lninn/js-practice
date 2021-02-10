import Animation from './Animation'
import Scene from './Scene'
import GameScene from './GameScene'

export default class StartScene extends Scene {
  constructor(app) {
    super(app)

    this.setup()
  }

  setup() {
    this.fps = 30
    this.animation = new Animation()
  }

  update() {
    const self = this
    this.animation.update(function () {
      self.app.replaceScene(new GameScene(self.app))
    })
  }

  draw() {
    const { app } = this
    this.animation.draw(app.context)
  }
}
