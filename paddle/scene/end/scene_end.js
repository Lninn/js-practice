class SceneEnd extends Scene {
  constructor(game) {
    super(game)

    this.init()
  }

  init() {
    this.bg = Spirit.new(this.game, 'bg1')
    this.addElement(this.bg)

    const self = this
    this.addKEvent('r', function() {
      const s = SceneTitle.new(self.game)
      self.game.replaceScene(s)     
    })

    this.addKEvent('k', function() {
      const s = SceneMain.new(self.game)
      self.game.replaceScene(s)        
    })
  }

  draw() {
    super.draw()

    const { boardArea, game, drawArea, } = this
    const c = game.context

    const tipBoard = {
      color: 'rgba(0, 0, 0, 0.3)',
      x: 30,
      y: 30,
      w: game.w - 2 * 30,
      h: game.h - 2 * 30,
    }

    drawArea(tipBoard)

    c.fillStyle = "#fff"
    c.font = '60px 微软雅黑'
    let text = 'GAME OVER'
    let l1 = c.measureText(text).width
    c.fillText(
      text, 
      (game.w-l1) / 2, 
      game.h / 2 - 100,
    )

    c.font = '30px 微软雅黑'
    text = '成绩: 10000'
    let l2 = c.measureText(text).width
    c.fillText(
      text, 
      (game.w - l2) / 2, 
      game.h / 2 - 200,
    )

    text = '重新开始 (K)'
    let l3 = c.measureText(text).width
    c.fillText(
      text, 
      (game.w) / 2 - l3 * 1.5, 
      game.h / 2 + 200,
    )

    text = '返回主页 (R)'
    let l4 = c.measureText(text).width
    c.fillText(
      text, 
      (game.w + l4) / 2, 
      game.h / 2 + 200,
    )

  }
}