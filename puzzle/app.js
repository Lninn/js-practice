class App {
  constructor() {
    config.__DEV__ && debug("App constructor")

    this.setup()
  }

  static getInstance(...args) {
    if (!this.instance) {
      this.instance = new this(...args)
    }

    return this.instance
  }

  setup() {
    const sel = config.sel || '#canvas'
    const canvas = e(sel)
    const ctx = canvas.getContext("2d")

    this.canvas = canvas
    this.ctx = ctx

    this.canvasWidth = config.canvasWidth || 600
    this.canvasHeight = config.canvasHeight || 400
    this.canvasPadding = config.canvasPadding || 12

    this.resources = config.paths || {}
    this.images = {}
    this.currentImg = null

    this.running = true
  }

  init() {
    const name = config.defaultName

    this.updateImage(name)
    this.setCanvasSize()
  }

  updateImage(name) {
    const img = this.images[name]
    this.currentImg = img
  }

  setCanvasSize() {
    const { canvas, canvasPadding: p, images } = this

    const w = this.canvasWidth + p
    const h = this.canvasHeight + p
    canvas.setAttribute("width", w)
    canvas.setAttribute("height", h)
  }

  loadResource(run) {
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
          run()
        }
      }
    }
  }

  bindEvent(type, fn) {
    const { canvas } = this

    canvas.addEventListener(type, fn)
  }

  isRun() {
    return this.running
  }

  /**
   * draw rect
   *
   * @param {rect} rect
   * @param {draw type： current 当前拖动的 block，close 最近的 block } type
   */
  drawRect(rect, type) {
    const { ctx } = this

    switch (type) {
      case "current":
        ctx.shadowColor = "#ea4335"
        ctx.shadowBlur = 3
        ctx.strokeStyle = "#4285f4"
        ctx.lineWidth = 2
        break
      case "close":
        ctx.shadowBlur = 0
        ctx.strokeStyle = "#f9ab00"
        ctx.lineWidth = 2
        break
    }

    ctx.strokeRect(...rect)
  }

  drawCurrent(rect) {
    this.drawRect(rect, "current")
  }

  drawClose(rect) {
    this.drawRect(rect, "close")
  }

  drawNextBoard(second) {
    const { ctx, canvasWidth, canvasHeight } = this

    this.puzzle.draw()

    const padding = 80
    const w2 = canvasWidth - padding * 2
    const h2 = canvasHeight - padding * 2

    ctx.shadowBlur = 0

    ctx.strokeStyle = "red"
    ctx.lineWidth = 1
    ctx.fillStyle = "rgba(0, 0, 0, .4)"
    ctx.fillRect(padding, padding, w2, h2)

    const text = `${second} 秒后进入下一关卡`
    ctx.font = "30px serif"
    ctx.fillStyle = "#fff"
    ctx.textBaseline = "hanging"

    const { width } = ctx.measureText(text)
    const x = (canvasWidth - width) / 2
    const y = canvasHeight / 2

    ctx.fillText(text, x, y)
  }

  startNew() {
    log('换一图片继续')

    this.clearRect()

    const name = 'img2'
    this.updateImage(name)

    this.puzzle.setup()
    this.puzzle.init()
    this.puzzle.draw()
    
    this.running = true
  }

  nextLevel() {
    this.running = false

    let second = 3
    let timer
    let that = this
    const run = function() {
      timer = setTimeout(function() {
        second -= 1

        if (second === -1) {
          clearTimeout(timer)
          that.startNew()
          return
        }

        that.drawNextBoard(second)
        run()
      }, 1000)
    }

    run()
    this.drawNextBoard(second)
  }

  clearRect() {
    const { ctx, canvasWidth: w, canvasHeight: h, canvasPadding: p } = this
    ctx.clearRect(0, 0, w + p, h + p)

    ctx.fillStyle = 'rgba(0, 0, 0, .1)'
    ctx.fillRect(0, 0, w + p, h + p)
  }
}
