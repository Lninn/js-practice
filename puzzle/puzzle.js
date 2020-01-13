class Puzzle {
  constructor(app) {
    config.__DEV__ && debug("Puzzle constructor")

    this.app = app
    app.puzzle = this

    this.source = null

    this.running = true

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

    const { currentImg } = app

    const w = canvasWidth - p
    const h = canvasHeight - p

    const source = new Map()
    const numOfimg = config.numOfimg || 3
    this.numOfimg = numOfimg
    let spacing = p / 2

    let mapIndex = 1

    // canvas unit
    const rowUnit = Math.round(w / numOfimg)
    const colUnit = Math.round(h / numOfimg)

    // image unit
    const rowUnitOfImg = Math.round(currentImg.width / numOfimg)
    const colUnitOfImg = Math.round(currentImg.height / numOfimg)

    for (let col = 0; col < numOfimg; col++) {
      for (let row = 0; row < numOfimg; row++) {
        // calc space
        const r = (row + 1) * spacing
        const c = (col + 1) * spacing

        const t = [
          row * rowUnitOfImg,
          col * colUnitOfImg,
          rowUnitOfImg,
          colUnitOfImg,
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

    const list = generatelist(1, this.numOfimg * this.numOfimg + 1)
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
    this.initBlock()

    // swap data
    this.isSwap = false
    this.swapTarget = null

    this.currentIndex = {
      row: 0,
      col: 0,
    }
    this.indexMap = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]

    // event data
    this.hasDrag = false
    this.currentBlock = null
    this.mouseDownP = { x: 0, y: 0 }
    this.mouseMoveP = { x: 0, y: 0 }

    app.bindEvent("mousedown", this.handleMouseDown.bind(this))
    app.bindEvent("mouseup", this.handleMouseUp.bind(this))
    app.bindEvent("mousemove", this.handleMouseMove.bind(this))
    window.addEventListener("keydown", this.handleKeyDown.bind(this))
  }

  initBlock(b) {
    this.blocks = new Set()

    const values = this.source.values()
    const names = this.source.keys()

    for (const [key, value] of this.source) {
      const b = new Block(app, value, key)
      this.blocks.add(b)
    }
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

  getBlockByIndex(index) {
    for (const b of this.blocks) {
      if (b.index === index) {
        return b
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
    this.isSwap = distance < 45
    this.swapTarget = target
  }

  handleMouseDown(e) {
    const { x, y } = gPosOfEvt(e)

    if (!this.app.isRun()) {
      return
    }

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

    // __DEV__ && debug("handleMouseDown")
  }

  handleMouseUp(e) {
    const { app, currentBlock, swapTarget } = this

    if (!app.isRun()) {
      return
    }

    if (this.hasDrag) {
      this.hasDrag = false
    }

    if (this.isSwap) {
      currentBlock.swapBlock(swapTarget)
    } else if (currentBlock) {
      currentBlock.recovery()

      this.isSwap = false
      this.swapTarget = null
    }

    this.draw()

    this.isSwap = false
    this.swapTarget = null

    const indexs = [...this.blocks].map(b => b.index)
    if (isSortedList(indexs)) {
      this.app.nextLevel()
    }
  }

  handleMouseMove(e) {
    const { x, y } = gPosOfEvt(e)
    const { currentBlock, mouseDownP, mouseMoveP } = this

    mouseMoveP.x = x
    mouseMoveP.y = y

    if (!this.hasDrag) {
      return
    }

    if (currentBlock) {
      this.updateOfMove()
      this.draw()
    }
  }

  handleKeyDown(e) {
    const { keyCode } = e

    if (!app.isRun()) {
      return
    }

    let r
    let oldIndex = { ...this.currentIndex }
    switch (keyCode) {
      case 37:
        r = this.currentIndex.row
        if (r !== 0) {
          r -= 1
        }
        this.currentIndex.row = r
        break
      case 38:
        r = this.currentIndex.col
        if (r !== 0) {
          r -= 1
        }
        this.currentIndex.col = r
        break
      case 39:
        r = this.currentIndex.row
        if (r !== 2) {
          r += 1
        }
        this.currentIndex.row = r
        break
      case 40:
        r = this.currentIndex.col
        if (r !== 2) {
          r += 1
        }
        this.currentIndex.col = r
        break
    }

    const oldIndexNum = this.indexMap[oldIndex.col][oldIndex.row]
    const p = this.currentIndex
    const index = this.indexMap[p.col][p.row]

    const b1 = this.getBlockByIndex(oldIndexNum)
    const b2 = this.getBlockByIndex(index)

    b2.swapBlock(b1)

    this.draw()

    const indexs = [...this.blocks].map(b => b.index)
    if (isSortedList(indexs)) {
      this.app.nextLevel()
    }
  }

  getDirection(newIndex, oldIndex) {
    if (newIndex.col == oldIndex.col && newIndex.row == oldIndex.row) {
      log("没有动")
    } else if (newIndex.col == oldIndex.col) {
      if (newIndex.row > oldIndex.row) {
        log("right")
      } else {
        log("left")
      }
    } else if (newIndex.row == oldIndex.row) {
      if (newIndex.col > oldIndex.col) {
        log("bottom")
      } else {
        log("top")
      }
    }
  }

  updateOfMove() {
    const { currentBlock, mouseDownP, mouseMoveP } = this
    currentBlock.changePostion(mouseDownP, mouseMoveP)

    this.markCloseBlock()
  }

  drawBlocks() {
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

  draw() {
    const { app, currentBlock, swapTarget, mouseDownP, mouseMoveP } = this

    app.clearRect()

    this.drawBlocks()

    if (swapTarget) {
      app.drawClose(swapTarget.getRect())
    }

    if (currentBlock) {
      app.drawCurrent(currentBlock.getRect())
    }
  }
}
