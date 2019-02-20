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
    this.drawText({
      font: '22px 黑体',
      text: '游戏结束, 按 R 返回标题界面',
      x: 40,
      y: 300,
    })
  }
}