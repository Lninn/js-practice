class Paddle extends GameImage {
  constructor(game) {
    super(game, 'paddle', 60, 530)

    this.speed = 15
  }

  move(x) {
    if (x < 0) {
      x = 0
    } else if (x > 400 - this.w) {
      x = 400 - this.w
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
}