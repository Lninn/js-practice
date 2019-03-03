class Background extends Spirit {
  constructor() {
    super('bg1')

    this.y1 = -config.h.value
    this.y2 = -(this.image.height + config.h.value)
    this.speed = 3
  }

  update() {
    if (this.y1 >= config.h.value) {
      this.y1 = this.y2 - this.image.height
    }

    if (this.y2 >= config.h.value) {
      this.y2 = this.y1 - this.image.height
    }

    this.y1 += this.speed
    this.y2 += this.speed
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y1)
    ctx.drawImage(this.image, this.x, this.y2)
  }
}