class Block extends GameImage {
  constructor(game, position) {
    super(game, 'blockBlue', position[0], position[1])

    this.setup(position)
  }

  setup(position) {
    this.position = position
    this.alive = true
    this.lives = this.position[2] || 1

    this.h += 1

    // 减少碰撞的误差
    this.w -= 8
    this.h -= 7
  }

  collide(ball) {
    return intersect(this, ball) && this.alive
  }

  kill() {
    this.lives -= 1
    if (this.lives <= 0) {
      this.alive = false
    }
  }

  draw() {
    if (this.alive) {
      super.draw()
    }
  }
}