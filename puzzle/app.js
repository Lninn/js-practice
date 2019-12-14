class App {
  constructor() {
    __DEV__ && debug("App constructor")

    this.setup()

    this.canvasWidth = 300
    this.canvasHeight = 300
    this.canvasPadding = 12

    this.resources = {
      img1: "img.jpg",
    }
    this.images = {}
  }

  static getInstance(...args) {
    if (!this.instance) {
      this.instance = new this(...args)
    }

    return this.instance
  }

  setup() {
    const canvas = e("#container")
    const ctx = canvas.getContext("2d")

    this.canvas = canvas
    this.ctx = ctx
  }

  loadResource(callback) {
    const { resources, images } = this
    const names = Object.keys(resources)

    const that = this
    let num = 0
    for (const name of names) {
      const path = resources[name]

      const img = new Image()
      img.src = path
      img.onload = function() {
        images[name] = img
        num += 1

        if (num === names.length) {
          callback()
        }
      }
    }
  }

  bindEvnet(type, fn) {
    const { canvas } = this

    canvas.addEventListener(type, fn)
  }

  setCanvasSize() {
    const { canvas, canvasPadding: p, images } = this
    const { width, height } = images["img1"]

    const w = width + p
    const h = height + p
    canvas.setAttribute("width", w)
    canvas.setAttribute("height", h)

    this.canvasWidth = w
    this.canvasHeight = h
  }

  drawBlock(data) {
    const { ctx, images } = this
    const img = images["img1"]

    ctx.drawImage(img, ...data)
  }
}
