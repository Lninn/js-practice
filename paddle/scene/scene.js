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
    this.headArea = { x: 0, y: 0, w: 400, h: 40, }

    // keydown
    this.addListener = this.listener.bind(this)
    window.addEventListener('keydown', this.addListener)
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
    this.elements.push(el)
  }

  removeElement(el) {
    const i = this.elements.indexOf(el)
    if (i > 0) {
      this.elements.splice(i, 1)
    }
  }

  update() {}

  draw() {
    this.elements.forEach(function(el) {
      el.draw()
    }, this)
  }
}