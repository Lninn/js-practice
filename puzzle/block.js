/**
 * Block Class
 */
class Block {
  constructor(app, rawData, index) {
    __DEV__ && debug("Block constructor")

    this.app = app

    this.reset(rawData)

    this.setup(index)
  }

  static isSameBlock(b1, b2) {
    return !!b2 && sumOfList(b1.getRect()) === sumOfList(b2.getRect())
  }

  isSame(block) {
    this.index === block.index
  }

  setup(index) {
    this.nameOfPre = "BLOCK"
    this.index = index
    this.name = `${this.nameOfPre}${index}`
  }

  reset(rawData) {
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

  changeIndex({ index }) {
    this.index = index
    this.name = `${this.nameOfPre}${index}`
  }

  /**
   * 交换的时候
   * @param {*} x
   * @param {*} y
   */
  swapPosition(x, y) {
    this.start = x
    this.end = y

    this.lastStart = x
    this.lastEnd = y

    this.updateRaw([x, y])
  }

  /**
   * 移动的时候
   *
   * @param {mouse down position} downP
   * @param {mouse move position} moveP
   */
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
    const { app } = this
    app.drawBlock(this.raw)
  }
}
