import Scene from '../Scene'

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

    context.font = '12px serif'
    context.fillText('游戏结束，刷新重新开始', 10, 50)
  }
}
