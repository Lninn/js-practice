class SceneEnd extends Scene {
  constructor(game) {
    super(game)

    this.init()
  }

  init() {
    const self = this
    this.registerAction('r', function() {
      const s = SceneTitle.new(self.game)
      self.game.replaceScene(s)
    })
  }

  draw() {
    this.game.context.fillStyle = "black"
    this.game.context.font = '16px serif'
    this.game.context.fillText('游戏结束, 按 r 返回标题界面', 80, 100)
  }
}