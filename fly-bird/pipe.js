class Pipe {
  constructor(app) {
    this.app = app

    this.width = 100
    this.height = this.randomHeight()
    this.speed = -5
    this.x = 0
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
    if (this.x <= -this.width) {
      this.height = this.randomHeight()
      this.x = 3 * 450
    } else {
      this.x += this.speed
    }
  }
}

class PipeList {
  constructor(app) {
    this.app = app
    this.initialPosition = this.app.width
    this.numOfPipes = 4
    this.betweenOfPipe = 450

    this.setup()
  }

  setup() {
    this.pipes = []

    for (let i = 1; i < this.numOfPipes; i++) {
      const pipe = new Pipe(this.app)
      pipe.x = i * this.betweenOfPipe + this.initialPosition

      this.pipes.push(pipe)
    }
  }

  update() {
    for (const pipe of this.pipes) {
      pipe.update()
    }
  }

  draw() {
    for (const pipe of this.pipes) {
      pipe.draw()
    }
  }
}