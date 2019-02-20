class Scene {
  constructor(game) {
    this.game = game
    this.actions = {}

    this.elements = []

    this.headArea = { x: 0, y: 0, w: 400, h: 40, }
  }

  static new(game) {
    const i = new this(game)
    return i
  }

  registerAction(key, action) {
    this.actions[key] = action
  }

  drawText(font = '16px serif', style='white', text, point) {
    this.game.context.font = font
    this.game.context.fillStyle = style
    this.game.context.fillText(text, point.x, point.y)
  }

  drawTitle(color) {
    this.game.context.fillStyle = color
    this.game.context.fillRect(this.headArea.x, this.headArea.y, this.headArea.w, this.headArea.h)
  }

  drawBg(name) {
    let img = this.game.imageByName(name)
    this.game.context.drawImage(img.image, 0, 0, 500, 800)
  }

  update() {}

  draw() {
    if (this.elements.length !== 0) {
      this.elements.forEach(function(el) {
        el.draw()
      }, this)
    }
  }

 
}