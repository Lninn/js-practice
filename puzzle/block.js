/**
 * Block Class
 */
class Block {
  constructor(app, rawData, index) {
    config.__DEV__ && debug("Block constructor")

    this.app = app

    this.setup(rawData, index)
  }

  setup(rawData, index) {
    this.index = index

    this.raw = rawData

    const [start, end, width, height] = rawData.slice(4)
    this.start = start
    this.end = end
    this.width = width
    this.height = height

    // 保存旧的位置数据
    this.lastStart = start
    this.lastEnd = end
  }

  swapBlock(updatedBlock) {
    const { lastStart: xOfb1, lastEnd: yOfb1, index: iOfb1 } = updatedBlock
    const { lastStart: xOfb2, lastEnd: yOfb2, index: iOfb2 } = this

    this.start = xOfb1
    this.end = yOfb1
    this.lastStart = xOfb1
    this.lastEnd = yOfb1

    this.updateRaw([xOfb1, yOfb1])

    updatedBlock.start = xOfb2
    updatedBlock.end = yOfb2
    updatedBlock.lastStart = xOfb2
    updatedBlock.lastEnd = yOfb2

    updatedBlock.updateRaw([xOfb2, yOfb2])

    this.index = iOfb1
    updatedBlock.index = iOfb2
  }

  changePostion(downP, moveP) {
    const { x, y } = moveP
    this.start = x - downP.x
    this.end = y - downP.y

    this.updateRaw([this.start, this.end])
  }

  recovery() {
    this.start = this.lastStart
    this.end = this.lastEnd

    this.updateRaw([this.lastStart, this.lastEnd])
  }

  /**
   *
   * @param {新数据，数组} updatedData
   * @param {数据类型 位置 } type
   */
  updateRaw(updatedData = [], type = "position") {
    // __DEV__ && debug("updateRaw", updatedData)
    switch (type) {
      case "position":
        this.raw.splice(4, 2, ...updatedData)
        break
      default:
        debug(`updateRaw unknow type ${type}`)
        break
    }
  }

  getRect() {
    return [this.start, this.end, this.width, this.height]
  }

  draw() {
    const {
      app: { ctx, currentImg },
    } = this

    ctx.drawImage(currentImg, ...this.raw)
  }
}

// class BlockList {
//   constructor(source) {
//     this.blocks = new Set()
//     this.source = source

//     this.setup()
//   }

//   setup() {}
// }
