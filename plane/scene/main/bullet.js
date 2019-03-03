class Bullet extends Spirit {
  constructor(name, x, y) {
    super(name, x, y)

    this.setup()
  }

  setup() {
    this.speed = config.bullet_speed.value
    this.alive = true
  }

  update = function() {
    this.speed = config.bullet_speed.value
    this.y -= this.speed
  }
}