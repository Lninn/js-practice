class App {
  constructor() {
    __DEV__ && debug("App constructor")

    this.timerOfStart = null
    this.timerOfEnd = null
    this.timeIntervalOfStart = 10
    this.timeIntervalOfEnd = 3

    this.setup()

    this.canvasWidth = 400
    this.canvasHeight = 300
    this.canvasPadding = 12

    this.currentImg = null
    this.resources = {
      img1: "img.jpg",
      img2: "img2.jpg",
    }
    this.images = {}

    this.running = true
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

    const that = this
    this.timerOfStart = setInterval(function() {
      if (that.timeIntervalOfStart === 0) {
        clearInterval(that.timerOfStart)
        that.timerOfStart = null
      }
      that.timeIntervalOfStart -= 1
    }, 1000)
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

  bindEvent(type, fn) {
    const { canvas } = this

    canvas.addEventListener(type, fn)
  }

  init(imgName) {
    this.imgName = imgName

    this.updateImage(imgName)
    this.setCanvasSize()
  }

  updateImage(name) {
    this.imgName = name

    const img = this.images[name]
    this.currentImg = img
  }

  setCanvasSize() {
    const { canvas, canvasPadding: p, images } = this
    // const { width, height } = this.currentImg

    const w = this.canvasWidth + p
    const h = this.canvasHeight + p
    canvas.setAttribute("width", w)
    canvas.setAttribute("height", h)

    // this.canvasWidth = w
    // this.canvasHeight = h
  }

  drawBlock(data) {
    const { ctx, images } = this
    const img = this.currentImg

    ctx.drawImage(img, ...data)
  }

  /**
   * draw rect
   *
   * @param {rect} rect
   * @param {draw type： current 当前拖动的 block，close 最近的 block } type
   */
  drawRect(rect, type) {
    const { ctx } = this

    // ctx.shadowColor = "#ea4335"
    // ctx.shadowBlur = 3

    switch (type) {
      case "current":
        ctx.strokeStyle = "red"
        ctx.lineWidth = 1
        break
      case "close":
        ctx.strokeStyle = "#ddd"
        ctx.lineWidth = 1
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

    this.clearRect()

    const padding = 80
    const w2 = canvasWidth - padding * 2
    const h2 = canvasHeight - padding * 2

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

  nextLevel() {
    const { ctx, canvasWidth, canvasHeight } = this

    this.running = false
    if (this.imgName === 'img2') {
      this.clearRect()

      const padding = 80
      const w2 = canvasWidth - padding * 2
      const h2 = canvasHeight - padding * 2

      ctx.strokeStyle = "red"
      ctx.lineWidth = 1
      ctx.fillStyle = "rgba(0, 0, 0, .4)"
      ctx.fillRect(padding, padding, w2, h2)

      const text = '游戏结束'
      ctx.font = "30px serif"
      ctx.fillStyle = "#fff"
      ctx.textBaseline = "hanging"

      const { width } = ctx.measureText(text)
      const x = (canvasWidth - width) / 2
      const y = canvasHeight / 2

      ctx.fillText(text, x, y)
      return
    }

    const that = this
    this.timerOfEnd = setInterval(function() {
      that.timeIntervalOfEnd -= 1
      if (that.timeIntervalOfEnd === 0) {
        clearInterval(that.timerOfEnd)
        that.timerOfEnd = null
        
        that.timeIntervalOfEnd = 3
        that.running = true
        that.updateImage('img2')
        that.puzzle.setup()
        that.puzzle.initBlock()
        that.puzzle.draw()
      } else {
        that.drawNextBoard(that.timeIntervalOfEnd)
      }
    }, 1000)

    this.drawNextBoard(this.timeIntervalOfEnd)
  }

  clearRect() {
    const { ctx, canvasWidth: w, canvasHeight: h, canvasPadding: p } = this
    ctx.clearRect(0, 0, w + p, h + p)
  }
}
