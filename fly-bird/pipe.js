class Pipe {
  constructor(app) {
    this.app = app

    this.width = 100
    this.height = this.randomHeight()
    this.speed = -2
    this.x = 200
    this.y = 0
    this.betweenDistance = 300
  }

  randomHeight() {
    const min = 80
    const max = 200
    const n1 = randomInt(min, max)
    const n2 = randomInt(min, max)
    return n1 + n2
  }

  draw() {
    const { ctx, textures } = this.app
    const { x, y, width, height } = this

    const h1 = this.height
    const h2 = this.app.height - h1 - this.betweenDistance
    ctx.drawImage(textures["pipe"], x, y, width, h1)

    ctx.save()
    ctx.transform(1, 0, 0, -1, 0, this.app.height)
    ctx.drawImage(textures["pipe"], x, y, width, h2)
    ctx.restore()
  }

  update() {
    if (this.x <= -100) {
      this.height = this.randomHeight()
      this.x = this.app.width + 100
    } else {
      this.x += this.speed
    }
  }
}
