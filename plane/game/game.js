class Game {
  constructor() {
    this.setup()
    this.init()
  }

  static instance() {
    this.i = this.i || new this()
    return this.i
  }

  setup() {
    this.canvas = e('#' + config.canvas_id.value)
    this.ctx = this.canvas.getContext('2d')

    this.keydowns = {}
    this.fps = 60
    this.scene = null
  }

  init() {
    window.addEventListener('keydown', e => {
      const k = e.key
      this.keydowns[k] = true
    })
    
    window.addEventListener('keyup', e => {
      const k = e.key
      this.keydowns[k] = false
    })
  }

  runloop() {
    const self = this

    setTimeout(function() {
      // event
      const keys = Object.keys(self.scene.actions)
      for (const key of keys) {
        if (self.keydowns[key]) {
          self.scene.actions[key](key)
        }
      }

      self.scene.update()

      // clear
      self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height)

      // draw
      self.scene.draw()

      self.runloop()
    }, 1000 / self.fps)
  }

  replaceScene(scene) {
    this.scene = scene
  }

  loadImg(callback) {
    const loads = []
    const names = Object.keys(config.images)
    for (const name of names) {
      const path = config.images[name]
      const img = new Image()
      img.src = path
      img.onload = function() {
        loads.push(1)
        config.images[name] = img
        if (names.length == loads.length) {
          callback()
        }
      }
    }
  }

  __start(app) {
    this.loadImg(() => {
      this.scene = app(this)
      this.runloop()
    })
  }
}