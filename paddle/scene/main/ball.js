class Ball extends GameImage {
  constructor(game) {
    super(game, 'ball1', 0, 0)

    this.x = (game.canvas.width - this.w) / 2
    this.y = 800 - this.h
    
    this.speedX = -5
    this.speedY = -5
    this.fired = false
  }

  move(height) {
    if (this.fired) {
      if (this.x <= 0 || this.x + this.w >= 640) {
        this.speedX *= -1
      } else if (this.y <= height || this.y + this.h >= 960) {
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
    this.x = (this.game.canvas.width - this.w) / 2
    this.y = 800 - this.h
    this.fired = false
  }
}