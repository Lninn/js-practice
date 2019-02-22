class SceneTitle extends Scene {
  constructor(game) {
    super(game)

    this.init()
  }

  init() {
    this.name = 'Paddle Game'
    this.opText = [
      '开始游戏(K)  编辑关卡(E)',
      '开启全屏(Q)  清空记录(C)',
    ]
    this.author = 'Lninn'
    this.fullScreen = false
    this.bg = GameImage.new(this.game, 'bg1')

    const self = this
    this.registerAction('k', function() {
      const s = SceneMain.new(self.game)
      self.game.replaceScene(s)
    })

    this.registerAction('e', function() {
      const s = SceneEditor.new(self.game)
      self.game.replaceScene(s)
    })

    this.registerAction('q', function() {
      if (self.fullScreen) {
        self.fullScreen = false
        document.webkitExitFullscreen()
      } else {
        self.fullScreen = true
        document.documentElement.webkitRequestFullScreen()
      }
    })
    
    this.registerAction('c', function() {
      log('清空当前游戏进度')
    })

    this.addElement(this.bg)
    this.initText()
  }

  initText() {
    const name = GameText.new(this.game, {
      font: '70px Arial',
      style: '#db3236', 
      text: this.name,
      x: 120,
      y: 300,
    })

    this.opText.forEach(function(text, i) {
      this.addElement(GameText.new(this.game, {
        style: 'rgba(0, 0, 0, 0.5)',
        font: '26px 微软雅黑',
        text: text,
        x: 170,
        y: 500 + (i * 50),
      }))
    }, this)

    const x = (this.game.canvas.width - 100) / 2
    const author = GameText.new(this.game, {
      font: '20px 微软雅黑',
      style: 'black', 
      text: `make by ${this.author}`,
      x: x,
      y: 900,
    })

    this.addElement(name)
    this.addElement(author)
  }

  // draw() {
  //   this.game.context.drawImage(this.bg.image, 0, 0, 400, 600)

  //   super.draw()
  // }
}