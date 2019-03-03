class AnimationStateless extends Animation {
  constructor() {
    super('explosion1')

    this.init()
  }

  init() {
    this.frames = []

    const rowCount = Math.ceil(this.image.width / this.eachSize)
    const columnCount = Math.ceil(this.image.height / this.eachSize)

    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < columnCount; j++) {
        this.frames.push({ x: j * this.eachSize, y: i * this.eachSize })
      }
    }

    this.frame = this.frames[this.index]
  }

  update() {
    if (this.lives < 0) {
      this.alive = false
      return
    }

    if (this.frameCount <= 0) {
      this.index = (this.index + 1) % this.frames.length
      this.frame = this.frames[this.index]
      this.frameCount = 5
    }

    this.frameCount -= 1
    this.lives--
  }
}