let score = 0
const Pipe = function(app) {
  this.app = app
  this.x = 0
  this.y = 0
  this.speed = -2
  this.width = 100
  this.height = 0

  this.reset()
}

Pipe.prototype = {
  reset () {
    const { app, width, } = this

    this.height = randomInt(200, 300)
    this.x = app.width
  },
  draw () {
    const { app, x, y, width, height, } = this
    //
    // app.ctx.translate(0, height)
    //
    // app.ctx.scale(1, -1)
    //
    app.ctx.drawImage(app.textures['pipe'], x, y, width, height)
    //
    // app.ctx.setTransform(1, 0, 0, 1, 0, 0)
    // //
    // app.ctx.translate(0, app.height - 120 - height2)
    //
    // app.ctx.drawImage(app.textures['pipe'], x, y, 100, height2)
    //
    // app.ctx.setTransform(1, 0, 0, 1, 0, 0)
  },
  update (bird) {
    const { app, } = this

    this.x += this.speed

    if (this.x <= 0) {
      this.reset()
    }
  },
}
