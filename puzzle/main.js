let __DEV__ = true

const debugEl = e("#debug")
const printSource = function(blocks) {
  const list = [...blocks].map(s => s.raw)
  const r = canvas.getBoundingClientRect()

  let html = `
    <div class="canvas-data">
        <pre>
            ${JSON.stringify(r, null, 5)}
        </pre>
    </div>
  `

  for (const b of blocks) {
    const [x, y] = b.raw.slice(4)
    const t = `
    <div class="code-block">
        <pre>
            ${JSON.stringify({ idx: b.index, x, y }, null, 5)}
        </pre>
    </div>
        `
    html += t
  }

  debugEl.innerHTML = html
}

let mainWidth = 300
let mainHeight = 300

const canvas = e("#container")
const ctx = canvas.getContext("2d")

const padding = 12
const setSize = function({ width, height }) {
  canvas.setAttribute("width", width + padding)
  canvas.setAttribute("height", height + padding)

  mainWidth = width + padding
  mainHeight = height + padding
}

const img = new Image()
img.onload = function() {
  __main()
}
img.src = "img.jpg"

/**
 * hello
 */
class Puzzle {
  constructor(ctx, source) {
    this.ctx = ctx
    this.source = source

    this.blocks = new Set()

    this.init()
  }

  static getInstance(...args) {
    if (!this.instance) {
      this.instance = new this(...args)
    }

    return this.instance
  }

  init() {
    for (const raw of this.source) {
      const b = new Block(raw)
      this.addBlock(b)
    }
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

  draw() {
    __DEV__ && printSource(this.blocks)

    for (const { raw } of this.blocks) {
      this.ctx.drawImage(img, ...raw)
    }
  }
}

const __main = function() {
  const { width, height } = img

  setSize({
    width,
    height,
  })

  const config = {}

  const source = new Set()
  const numOfimg = 3
  let spacing = 3

  const rowUnit = Math.round(width / numOfimg)
  const colUnit = Math.round(height / numOfimg)
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

  const puzzle = Puzzle.getInstance(ctx, source)

  printSource(puzzle.blocks)

  const borderColor = "#2f54eb"
  const fillColor = "#ea4335"
  ctx.fillStyle = fillColor
  ctx.lineWidth = 3
  ctx.strokeStyle = borderColor

  ctx.shadowColor = "#ea4335"
  ctx.shadowBlur = 5

  puzzle.draw()

  const handleCanvasClick = function(e) {
    const { offsetX: x, offsetY: y } = e

    const b = getBlock({
      x,
      y,
    })
    log("click ", b)
  }

  let hasDrag = false
  let currentBlock = null

  const mouseDownP = { x: 0, y: 0 }
  const handleCanvasMouseDown = function(e) {
    const { offsetX: x, offsetY: y } = e

    const b = puzzle.getBlock({
      x,
      y,
    })

    // __DEV__ && debug({ x, y, b })

    if (b) {
      currentBlock = b
      hasDrag = true

      mouseDownP.x = x - b.start
      mouseDownP.y = y - b.end
    }
  }

  const handleCanvasMouseUp = function(e) {
    if (hasDrag) {
      hasDrag = false
    }

    if (currentBlock) {
      currentBlock.recovery()

      ctx.clearRect(0, 0, mainWidth, mainHeight)
      puzzle.draw()
    }
  }

  let lastBlock
  const mouseMoveP = { x: 0, y: 0 }
  const handleCanvasMouseMove = function(e) {
    const { offsetX: x, offsetY: y } = e

    mouseMoveP.x = x
    mouseMoveP.y = y

    if (!hasDrag) {
      return
    }

    if (currentBlock && hasDrag) {
      currentBlock.changePostion(mouseDownP, mouseMoveP)

      const closeBlock = puzzle.getCloseBlock(currentBlock)

      ctx.clearRect(0, 0, mainWidth, mainHeight)
      puzzle.draw()

      ctx.strokeRect(...currentBlock.getRect())
      ctx.strokeRect(...closeBlock.getRect())
    } else if (currentBlock) {
      currentBlock = null
    }
  }

  // canvas.addEventListener('click', handleCanvasClick)

  canvas.addEventListener("mousedown", handleCanvasMouseDown)
  canvas.addEventListener("mouseup", handleCanvasMouseUp)
  canvas.addEventListener("mousemove", handleCanvasMouseMove)
}
