let score = 0
const Pipe = function(app) {
  this.app = app
  this.x = 0
  this.y = 0
  this.speed = -2
  this.width = 100
  this.height = 0
  this.height2 = 0
  this.verticalInterval = 400
  this.horizontalInterval = 500

  this.add()
  this.reset()
}

Pipe.prototype = {
  // 每增加一个 pipe, number + 1
  number: 0,
  flapY: true,
  add () {
    const proto = Object.getPrototypeOf(this)

    proto.number += 1
    proto.flapY = !proto.flapY
  },
  reset (offset = 0) {
    this.active = true

    const { app, horizontalInterval, verticalInterval, number, flapY, } = this
    this.x = app.width + number * horizontalInterval + offset
    // this.x = 400

    const randomNum = randomInt(150, 200)
    if (flapY) {
      this.height = randomNum
      this.height2 = app.height - 120 - randomNum - verticalInterval
    } else {
      this.height = app.height - 120 - randomNum - verticalInterval
      this.height2 = randomNum
    }
  },
  draw () {
    const { app, x, y, width, height, height2, verticalInterval, } = this

    app.ctx.translate(0, height)

    app.ctx.scale(1, -1)

    app.ctx.drawImage(app.textures['pipe'], x, y, width, height)

    app.ctx.setTransform(1, 0, 0, 1, 0, 0)
    //
    app.ctx.translate(0, app.height - 120 - height2)

    app.ctx.drawImage(app.textures['pipe'], x, y, 100, height2)

    app.ctx.setTransform(1, 0, 0, 1, 0, 0)
  },
  update (bird) {
    const { app } = this
    if (bird.x > this.x && this.active) {
      score += 1
      this.active = false
    }

    if (intersect(this, bird, app.height)) {
      app.end = true
    }

    this.x += this.speed

    if (this.x < -this.width) {
      const proto = Object.getPrototypeOf(this)

      proto.flapY = !proto.flapY

      this.reset(-800)
    }
  },
}
