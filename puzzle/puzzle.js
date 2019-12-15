class Puzzle {
  constructor(app) {
    __DEV__ && debug("Puzzle constructor")

    this.app = app
    this.source = null

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
    for (let col = 0; col < numOfimg; col++) {
      for (let row = 0; row < numOfimg; row++) {
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
    const { app } = this
    this.blocks = new Set()

    for (const raw of this.source) {
      const b = new Block(app, raw)
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

    this.swapData = {
      do: distance < 50,
      block: currentBlock,
    }

    return currentBlock
  }

  swap() {
    const {
      app,
      currentBlock,
      swapData: { block: closeBlock },
    } = this
    debug(currentBlock, closeBlock)

    if (!closeBlock) {
      return
    }

    const t = [closeBlock.lastStart, closeBlock.lastEnd]
    const t2 = closeBlock.index

    closeBlock.swapPosition(currentBlock.lastStart, currentBlock.lastEnd)
    closeBlock.changeIndex(currentBlock)

    currentBlock.swapPosition(...t)
    currentBlock.changeIndex({ index: t2 })

    app.ctx.clearRect(0, 0, app.canvasWidth, app.canvasHeight)

    this.draw()
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
    const { currentBlock } = this

    if (this.hasDrag) {
      this.hasDrag = false
    }

    if (this.swapData && this.swapData.do) {
      this.swap()
    } else if (currentBlock) {
      currentBlock.recovery()

      app.ctx.clearRect(0, 0, app.canvasWidth, app.canvasHeight)

      this.draw()
    }

    printIndex(this.blocks)
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

      app.drawCurrent(currentBlock.getRect())
      app.drawClose(closeBlock.getRect())
    } else if (currentBlock) {
      this.currentBlock = null
    }
  }

  draw() {
    const { blocks } = this

    for (const block of this.blocks) {
      block.draw()
    }
  }
}
