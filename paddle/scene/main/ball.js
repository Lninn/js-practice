class Ball extends GameImage {
  constructor(game, position) {
    super(game, 'ball', 60, 400)

    this.speedX = 3
    this.speedY = 3
    this.fired = false
  }

  move(height) {
    if (this.fired) {
      if (this.x <= 0 || this.x + this.w >= 400) {
        this.speedX *= -1
      } else if (this.y <= height || this.y + this.h >= 600) {
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

  hasPoint(x, y) {
    const xIn = x > this.x && x < this.x + this.w
    const yIn = y > this.y && y < this.y + this.h

    return xIn && yIn
  }

  reset() {
    this.x = 60
    this.y = 400
    this.fired = false
  }
}