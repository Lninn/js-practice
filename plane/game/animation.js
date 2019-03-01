class Animation extends Spirit {
  constructor(ctx, name, x, y) {
    super(ctx, name, x, y)

    this.setup()
  }

  setup() {
    this.frames = null
    this.index = 0

    this.frameCount = 5
    this.eachSize = 64
    
    this.lives = 60
    this.alive = true

    // 更改动画的位置
    this.x = this.x + this.eachSize / 2
  }

  draw() {
    if (!this.alive) {
      return
    }

    this.ctx.drawImage(
      this.image, 
      this.frame.x,
      this.frame.y,
      this.eachSize,
      this.eachSize,
      this.x,
      this.y,
      this.eachSize,
      this.eachSize,
    )
  }
}