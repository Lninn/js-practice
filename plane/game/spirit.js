class Spirit {
  constructor(ctx, name, x = 0, y = 0) {
    this.ctx = ctx
    this.name = name
    this.x = x
    this.y = y

    this.image = config.images[this.name]
    this.w = this.image.width
    this.h = this.image.height
  }

  static new(...args) {
    return new this(...args)
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y)
  }
}