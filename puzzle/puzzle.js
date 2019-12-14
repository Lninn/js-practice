class Puzzle {
  constructor(app) {
    __DEV__ && debug("Puzzle constructor")

    this.app = app
    this.source = null

    this.blocks = new Set()

    this.setup()
    this.init()
  }

  static getInstance(...args) {
    if (!this.instance) {
      this.instance = new this(...args)
    }

    return this.instance
  }

  setup() {
    const {
      app: { canvasWidth, canvasHeight },
    } = this

    const source = new Set()
    const numOfimg = 3
    let spacing = 3

    const rowUnit = Math.round(canvasWidth / numOfimg)
    const colUnit = Math.round(canvasHeight / numOfimg)
    for (let row = 0; row < numOfimg; row++) {
      for (let col = 0; col < numOfimg; col++) {
        // calc space
        const r = (row + 1) * spacing
        const c = (col + 1) * spacing

        const t = [
          row * rowUnit,
          col * colUnit,
          rowUnit,
          colUnit,
          row * rowUnit + r,
          col * colUnit + c,
          rowUnit,
          colUnit,
        ]

        source.add(t)
      }
    }

    this.source = source
  }

  init() {
    for (const raw of this.source) {
      const b = new Block(raw)
      this.addBlock(b)
    }

    // event data
    this.hasDrag = false
    this.currentBlock = null
    this.lastBlock = null
    this.mouseDownP = { x: 0, y: 0 }
    this.mouseMoveP = { x: 0, y: 0 }

    app.bindEvnet("mousedown", this.handleMouseDown.bind(this))
    app.bindEvnet("mouseup", this.handleMouseUp.bind(this))
    app.bindEvnet("mousemove", this.handleMouseMove.bind(this))
  }

  addBlock(b) {
    this.blocks.add(b)
  }

  getBlock({ x, y }) {
    for (const b of this.blocks) {
      const { start, end, width, height } = b

      if (x >= start && x <= start + width) {
        if (y >= end && y <= end + height) {
          this.blocks.delete(b)
          this.blocks.add(b)
          return b
        }
      }
    }

    return null
  }

  /**
   * 获取和 b 最近的 block
   *
   * @param {当前移动的 block} b
   */
  getCloseBlock(b) {
    let distance = Number.MAX_SAFE_INTEGER
    let currentBlock
    for (const item of this.blocks) {
      if (item.index === b.index) {
        continue
      }
      const d = getDistanceBetween2B(b, item)
      if (d <= distance) {
        distance = d
        currentBlock = item
      }
    }
    log(distance)

    return currentBlock
  }

  handleMouseDown(e) {
    const { offsetX: x, offsetY: y } = e

    const b = this.getBlock({
      x,
      y,
    })

    if (b) {
      this.currentBlock = b
      this.hasDrag = true

      this.mouseDownP.x = x - b.start
      this.mouseDownP.y = y - b.end
    }
  }

  handleMouseUp(e) {
    const { currentBlock, app } = this
    if (this.hasDrag) {
      this.hasDrag = false
    }

    if (currentBlock) {
      currentBlock.recovery()

      app.ctx.clearRect(0, 0, app.canvasWidth, app.canvasHeight)
      this.draw()
    }
  }

  handleMouseMove(e) {
    const { offsetX: x, offsetY: y } = e
    const { currentBlock, mouseDownP, mouseMoveP } = this

    mouseMoveP.x = x
    mouseMoveP.y = y

    if (!this.hasDrag) {
      return
    }

    if (currentBlock && this.hasDrag) {
      currentBlock.changePostion(mouseDownP, mouseMoveP)

      const closeBlock = this.getCloseBlock(currentBlock)

      app.ctx.clearRect(0, 0, app.canvasWidth, app.canvasHeight)
      this.draw()

      app.ctx.shadowColor = "#ea4335"
      app.ctx.shadowBlur = 5

      app.ctx.strokeStyle = "red"
      app.ctx.lineWidth = 3

      app.ctx.strokeRect(...currentBlock.getRect())

      app.ctx.strokeStyle = "blue"
      app.ctx.lineWidth = 1
      app.ctx.strokeRect(...closeBlock.getRect())
    } else if (currentBlock) {
      this.currentBlock = null
    }
  }

  draw() {
    const { app } = this

    for (const { raw } of this.blocks) {
      app.drawBlock(raw)
    }
  }
}
