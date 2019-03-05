class Animation extends Spirit {
  constructor(name) {
    super(name)

    this.frames = null
    this.index = 0

    this.frameCount = 5
    this.eachSize = 64
    
    this.lives = 60
    this.alive = true

    // 是否播放动画
    this.isPlaying = false

    this.animationImage = null
  }

  playAnimation() {
    this.initAnimation()

    // 更改动画的位置
    this.x = this.x + this.eachSize / 2

    this.isPlaying = true
  }

  draw(ctx) {
    if (!this.alive) {
      return
    }

    if (this.isPlaying) {
      ctx.drawImage(
        this.animationImage, 
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
        this.image,
        this.x,
        this.y      
      )
    }
  }
}