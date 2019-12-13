/**
 * Block Class
 */
class Block {
  constructor(rawData) {
    this.raw = rawData

    const [start, end, width, height] = rawData.slice(4)
    this.start = start
    this.end = end
    this.width = width
    this.height = height

    // 保存旧的位置数据
    this.lastStart = start
    this.lastEnd = end

    this.setup()
  }

  setup() {
    this.index = `b${Block.numOfItem}`
    Block.numOfItem += 1
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
   * @param {数据类型 位置 position、大小 size} type
   */
  updateRaw(updatedData = [], type = "position") {
    switch (type) {
      case "size":
        debug("updateRaw size")
        break
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

  static numOfItem = 1

  static isSameBlock(b1, b2) {
    return !!b2 && sumOfList(b1.getRect()) === sumOfList(b2.getRect())
  }
}
