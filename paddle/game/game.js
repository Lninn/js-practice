class Game {
  constructor(images, callback) {
    this.images = images
    this.callback = callback

    this.setup()
    this.init()
    this.__start()
  }

  setup() {
    this.canvas = document.getElementById('id-canvas')
    this.context = this.canvas.getContext('2d')

    this.keydowns = {}
    this.fps = 60
    this.scene = null

    this.w = this.canvas.width
    this.h = this.canvas.height
  }

  static instance(...args) {
    this.i = this.i || new this(...args)
    return this.i
  }

  init() {
    const c = this.canvas
    this.w = c.width
    this.h = c.height

    const self = this
    window.addEventListener('keydown', function(event) {
      const k = event.key
      self.keydowns[k] = true
    })
    window.addEventListener('keyup', function(event) {
      const k = event.key
      self.keydowns[k] = false
    })
  }

  drawImage(gameImage) {
    this.context.drawImage(gameImage.image, gameImage.x, gameImage.y)
  }

  imageByName(name) {
    const i = this.images[name]
    return i
  }

  update() {
    this.scene.update()
  }

  draw() {
    this.scene.draw()
  }

  runWithScene(scene) {
    this.scene = scene
    this.runloop()
  }
  
  replaceScene(scene) {
    this.scene = scene
  }

  runloop() {
    const self = this
    setTimeout(function() {
      // 各自场景的事件
      const keys = Object.keys(self.scene.actions)
      keys.forEach(function(k) {
        if (self.keydowns[k]) {
          self.scene.actions[k]()
        }
      })
  
      self.update()
  
      self.context.clearRect(0, 0, self.canvas.width, self.canvas.height)
      
      self.draw()

      self.runloop()
    }, 1000 / self.fps || 30)
  }

  __start() {
    const self = this
    const loads = []

    const names = Object.keys(self.images)
    names.forEach(function(name) {
      const img = new Image()
      img.src = self.images[name]
      img.onload = function() {
        self.images[name] = img
        loads.push(1)
        if (loads.length === names.length) {
          self.callback(self)
        }
      }
    })
  }
}