class Scene {
  constructor(game) {
    this.game = game
    
    this.setup()
  }

  static new(game) {
    const i = new this(game)
    return i
  }

  setup() {
    // 全局的状态按键
    this.actions = {}

    // 每个场景的按键事件 非状态
    this.keydownEvents = {}
    
    this.elements = []

    // 设定场景的大小
    const g = this.game
    this.w = g.w
    this.h = g.h

    this.boardArea = {
      x: 20,
      y: 10,
      w: this.w - 40,
      h: 40,
    }

    this.drawArea = this.drawArea.bind(this)
    this.drawText = this.drawText.bind(this)

    // keydown
    this.addListener = this.listener.bind(this)
    window.addEventListener('keydown', this.addListener)
  }

  // 绘制一个区域
  drawArea({ x, y, w, h, color = 'blue'}) {
    const c = this.game.context
    c.fillStyle = color
    c.fillRect(x, y, w, h)
  }

  // draw text
  drawText({ font, style, text, x, y}) {
    const c = this.game.context
    // log(c.measureText(text))
    c.font = font
    c.fillStyle = style
    c.fillText(text, x, y)
  }

  listener(event) {
    const k = event.key

    const keys = Object.keys(this.keydownEvents)
    keys.forEach(function(key) {
      if (key === k) {
        this.keydownEvents[k](event)
      } else {
        if (key.includes(k)) {
          this.keydownEvents[key](event.key)
        }
      }
    }, this)
  }

  done() {
    window.removeEventListener('keydown', this.addListener)
  }

  registerAction(key, action) {
    this.actions[key] = action
  }

  addKEvent(key, callback) {
    this.keydownEvents[key] = callback
  }

  addCanvasEvent(type, callback) {
    this.targetEvents[type] = callback
  }

  addElement(el) {
    if (Array.isArray(el)) {
      this.elements.concat(el)
    } else {
      this.elements.push(el)
    }
  }

  removeElement(el) {
    const i = this.elements.indexOf(el)
    if (i >= 0) {
      this.elements.splice(i, 1)
    }
  }

  update() {
    this.elements.forEach(function(el) {
      el.update && el.update()
    }, this)
  }

  draw() {
    this.elements.forEach(function(el) {
      el.draw()
    }, this)
  } 
}