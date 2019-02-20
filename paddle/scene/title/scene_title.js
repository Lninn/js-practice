class SceneTitle extends Scene {
  constructor(game) {
    super(game)

    this.name = 'Paddle Game'
    this.opText = [
      '开始游戏(K) 编辑关卡(E)',
      '开启全屏(Q) 清空记录(C)',
    ]
    this.fullScreen = false
    this.bg = GameImage.new(this.game, 'titleBg')

    this.init()
  }

  init() {
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
  }

  draw() {
    this.game.context.drawImage(this.bg.image, 0, 0, 400, 600)

    // text
    this.drawText({
      font: '50px Arial',
      style: '#db3236', 
      text: this.name,
      x: 60,
      y: 120,
    })

    this.opText.forEach(function(text, i) {
      this.drawText({
        font: '22px 黑体',
        text: text,
        x: 70,
        y: 360 + (i * 30),
      })
    }, this)
  }
}