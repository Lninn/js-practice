class SceneEnd extends Scene {
  constructor(game) {
    super(game)

    this.init()
  }

  init() {
    this.bg = GameImage.new(this.game, 'bg1')

    const self = this
    this.registerAction('r', function() {
      const s = SceneTitle.new(self.game)
      self.game.replaceScene(s)
    })

    this.addElement(this.bg)
    this.initText()
  }

  initText() {
    // const tips = GameText.new(this.game, {
    //   font: '30px Arial',
    //   style: 'black', 
    //   text: '返回开始界面(R)',
    //   x: 200,
    //   y: 400,
    // })

    // this.addElement(tips)
  }

  // draw() {
  //   this.game.context.drawImage(this.bg.image, 0, 0, 400, 600)

  //   super.draw()
  // }
}