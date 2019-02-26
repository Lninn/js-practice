class Paddle extends Spirit {
  constructor(game, name) {
    super(game, name)

    this.setup()
  }

  setup() {
    this.reset()
  }

  move(x) {
    const w = this.game.w

    if (x < 0) {
      x = 0
    } else if (x > w - this.w) {
      x = w - this.w
    }

    this.x = x
  }

  moveLeft() {
    this.move(this.x - this.speed)
  }

  moveRight() {
    this.move(this.x + this.speed)
  }

  collide(ball) {
    return intersect(this, ball)
  }

  reset() {
    this.x = (this.game.w - this.w) / 2
    // 初始化高度应该从配置文件里面读取
    this.y = 800

    this.speed = 10
  }
}