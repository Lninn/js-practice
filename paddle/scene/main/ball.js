class Ball extends Spirit {
  constructor(game, name) {
    super(game, name)

   this.setup()
  }

  setup() {
    this.reset()
  }

  fire() {
    this.fired = true
  }

  move() {
    const g = this.game
    // 小球移动的高度 hardcode
    const h = 50

    if (this.fired) {
      if (this.x <= 0 || this.x + this.w >= g.w) {
        this.speedX *= -1
      } else if (this.y <= h || this.y + this.h >= g.h) {
        this.speedY *= -1
      }

      this.x += this.speedX
      this.y += this.speedY
    }
  }

  rebound(b) {
    const t = overlap(this, b)
    if (t.x > t.y) {
      this.speedY *= -1
    } else {
      this.speedX *= -1
    }
  }

  reset() {
    this.x = (this.game.w - this.w) / 2
    // 初始化高度应该从配置文件里面读取
    this.y = 800 - this.h - 3
    
    this.speedX = -5
    this.speedY = -5
    this.fired = false
  }
}