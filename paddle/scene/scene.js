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

  addElement(el) {
    this.elements.push(el)
  }

  drawText(obj) {
    const g = this.game.context
    g.font = obj.font
    g.fillStyle = obj.style || '#000'
    g.fillText(obj.text, obj.x, obj.y)
  }

  drawHead(color) {
    this.game.context.fillStyle = color
    this.game.context.fillRect(this.headArea.x, this.headArea.y, this.headArea.w, this.headArea.h)
  }

  update() {}

  draw() {
    this.elements.forEach(function(el) {
      el.draw()
    }, this)
  }
}