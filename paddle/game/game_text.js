class GameText {
  constructor(game, obj) {
    this.game = game

    this.setup(obj)
  }

  setup(obj) {
    this.font = obj.font || '16px 微软雅黑'
    this.style = obj.style || '#000'
    this.text = obj.text || '未定义'
    this.x = obj.x || 0
    this.y = obj.y || 0

    this.enable = true
  }

  static new(...args) {
    return new this(...args)
  }

  toggle() {
    this.enable = !this.enable
  }

  draw() {
    if (!this.enable) {
      return
    }
    
    const g = this.game.context
    g.font = this.font
    g.fillStyle = this.style
    g.fillText(this.text, this.x, this.y)
  }
}