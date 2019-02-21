class Scene {
  constructor(game) {
    this.game = game
  }

  static new(game) {
    const i = new this(game)
    return i
  }

  setup() {
    // 全局的状态按键
    this.actions = {}

    // 每个场景的按键事件 非状态
    this.events = {}

    this.elements = []
    this.headArea = { x: 0, y: 0, w: 400, h: 40, }

    const self = this
    window.addEventListener('keydown', function(event) {
      const k = event.key
      const keys = Object.keys(self.events)
      keys.forEach(function(key) {
        if (key === k) {
          self.events[k](event)
        } else {
          if (key.includes(k)) {
            self.events[key](event)
          }
        }
      })
    })
  }

  registerAction(key, action) {
    this.actions[key] = action
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