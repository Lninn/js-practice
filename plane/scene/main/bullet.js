class Bullet extends Spirit {
  constructor(ctx, name, x, y) {
    super(ctx, name, x, y)

    this.setup()
  }

  setup() {
    this.speed = config.bullet_speed.value
  }

  update = function() {
    this.speed = config.bullet_speed.value
    this.y -= this.speed
  }
}