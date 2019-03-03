class Scene {
  constructor(ctx) {
    this.ctx = ctx

    this.elements = []
    // 状态按键
    this.actions = {}
  }

  static new(...args) {
    return new this(...args)
  }

  registerAction(key, action) {
    if (key.length > 1) {
      for (const k of key) {
        this.actions[k] = action
      }
    } else {
      this.actions[key] = action
    }
  }

  addEvent(key, callback) {
    window.addEventListener('keydown', function(e) {
      const k = e.key

      if (k == key) {
        callback()
      }
    })
  }

  addElement(element) {
    this.elements.push(element)
  }

  removeElement(element) {
    const i = this.elements.indexOf(element)
    this.elements.splice(i, 1)
  }

  update() {
    for (const element of this.elements) {
      element.update()
    }
  }

  draw() {
    for (const element of this.elements) {
      element.draw(this.ctx)
    }
  }
}