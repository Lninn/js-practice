class Block extends GameImage {
  constructor(game, { x, y, life = 1}) {
    super(game, 'blockBlue', x, y)

    this.setup(life)
  }

  setup(life) {
    this.alive = true
    this.lives = life

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
    // log('block draw')
    if (this.alive) {
      super.draw()
    }
  }
}