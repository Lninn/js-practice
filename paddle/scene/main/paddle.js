class Paddle extends GameImage {
  constructor(game) {
    super(game, 'paddle1', 0, 803)

    this.x = (game.canvas.width - this.w) / 2
    this.speed = 10
  }

  move(x) {
    if (x < 0) {
      x = 0
    } else if (x > 640 - this.w) {
      x = 640 - this.w
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
    this.x = (this.game.canvas.width - this.w) / 2
    this.y = 803
  }
}