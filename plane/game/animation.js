class Animation extends Spirit {
  constructor(name, x, y) {
    super(name, x, y)

    this.frames = null
    this.index = 0

    this.frameCount = 5
    this.eachSize = 64
    
    this.lives = 60
    this.alive = true

    // 更改动画的位置
    this.x = this.x + this.eachSize / 2

    // 是否播放动画
    this.isPlaying = false
  }

  playAnimation() {
    this.isPlaying = true
  }

  draw(ctx) {
    if (!this.alive) {
      return
    }

    if (this.isPlaying) {
      ctx.drawImage(
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
    } else {
      ctx.drawImage(
        this.staticImage,
        this.x,
        this.y      
      )
    }
  }
}