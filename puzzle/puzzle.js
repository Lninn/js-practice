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
      app: { canvasWidth, canvasHeight, canvasPadding: p },
    } = this

    const w = canvasWidth - p
    const h = canvasHeight - p

    const source = new Map()
    const numOfimg = 3
    let spacing = 3

    let mapIndex = 1

    const rowUnit = Math.round(w / numOfimg)
    const colUnit = Math.round(h / numOfimg)
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

        source.set(mapIndex, t)
        mapIndex += 1
      }
    }

    const s = this.shuffleSource(source)

    this.source = s
  }

  shuffleSource(source) {
    const s = new Map()
    const listOfValues = Array.from(source.values())

    const list = generatelist(1, 10)
    const randomList = shuffle(list)

    let counter = 0
    while (randomList.length) {
      // old value
      const m = listOfValues[counter]

      // random value
      const i = randomList.pop()
      const n = source.get(i)

      const t = [...m.slice(0, 4), ...n.slice(4, 6), ...m.slice(6, 8)]

      s.set(i, t)
      counter += 1
    }

    return s
  }

  init() {
    const { app } = this
    this.blocks = new Set()

    const values = this.source.values()
    const names = this.source.keys()

    for (const [key, value] of this.source) {
      const b = new Block(app, value, key)
      this.addBlock(b)
    }

    // swap data
    this.isSwap = false
    this.swapTarget = null

    // event data
    this.hasDrag = false
    this.currentBlock = null
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
   * 标记和 currentBlock 最近的 block
   */
  markCloseBlock() {
    let distance = Number.MAX_SAFE_INTEGER
    let target

    for (const item of this.blocks) {
      if (item === this.currentBlock) {
        continue
      }
      const d = getDistanceBetween2B(this.currentBlock, item)
      if (d <= distance) {
        distance = d
        target = item
      }
    }

    // 标记 swap 信息
    this.isSwap = distance < 50
    this.swapTarget = target
  }

  swap() {
    const { app, currentBlock, swapTarget, isSwap } = this

    if (!isSwap) {
      return
    }

    const t = [swapTarget.lastStart, swapTarget.lastEnd]
    const t2 = swapTarget.index

    swapTarget.swapPosition(currentBlock.lastStart, currentBlock.lastEnd)
    swapTarget.changeIndex(currentBlock)

    currentBlock.swapPosition(...t)
    currentBlock.changeIndex({ index: t2 })

    app.ctx.clearRect(0, 0, app.canvasWidth, app.canvasHeight)

    this.draw()
  }

  handleMouseDown(e) {
    const { x, y } = gPosOfEvt(e)

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

    if (this.isSwap) {
      this.swap()
    } else if (currentBlock) {
      currentBlock.recovery()

      app.ctx.clearRect(0, 0, app.canvasWidth, app.canvasHeight)

      this.draw()
    }

    this.isSwap = false
    this.swapTarget = null

    printSource(this.blocks)
  }

  handleMouseMove(e) {
    const { x, y } = gPosOfEvt(e)
    const { currentBlock, mouseDownP, mouseMoveP } = this

    mouseMoveP.x = x
    mouseMoveP.y = y

    if (!this.hasDrag) {
      return
    }

    if (currentBlock && this.hasDrag) {
      currentBlock.changePostion(mouseDownP, mouseMoveP)

      this.markCloseBlock()

      app.ctx.clearRect(0, 0, app.canvasWidth, app.canvasHeight)

      this.draw()

      app.drawClose(this.swapTarget.getRect())
      app.drawCurrent(currentBlock.getRect())
    } else if (currentBlock) {
      this.currentBlock = null
    }
  }

  draw() {
    const { blocks, currentBlock } = this

    for (const block of blocks) {
      if (block === currentBlock) {
        continue
      }
      block.draw()
    }

    if (currentBlock) {
      currentBlock.draw()
    }
  }
}
