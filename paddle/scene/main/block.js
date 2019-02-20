class Block extends GameImage {
  constructor(game, position) {
    super(game, 'block', position[0], position[1])

    this.alive = true
    this.lives = position[2] || 1
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