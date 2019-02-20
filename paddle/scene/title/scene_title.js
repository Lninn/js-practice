class SceneTitle extends Scene {
  constructor(game) {
    super(game)

    this.name = 'Paddle Game'
    this.opText = [
      '开始游戏(K) 编辑关卡(E)',
      '开启全屏(Q) 清空记录(C)',
    ]
    this.fullScreen = false

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
    // bg
    this.drawBg('titleBg')

    // text
    this.drawText('50px serif', '#db3236', this.name, { x: 70, y: 120 })

    this.opText.forEach(function(text, i) {
      this.drawText('22px 黑体', '#000', text, { x: 70, y: 360 + (i * 30), })
    }, this)
  }
}