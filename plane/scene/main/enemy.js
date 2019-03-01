class Enemy extends Spirit {
  constructor(ctx) {
    super(ctx, 'enemy1')

    this.setup()
  }

  setup() {
    this.y = -randomBetween(200, 300)
    this.x = randomBetween(0, config.w.value - this.w)
    this.speed = randomBetween(3, 6)
  }

  update = function() {
    this.y += this.speed
    if (this.y > config.h.value) {
      this.setup()
    }
  }

  collide(plane) {
    for (const b of plane.bullets) {
      if (intersect(this, b)) {
        plane.bullets.splice(plane.bullets.indexOf(b), 1)
        return true
      }
    }

    return false
  }
}