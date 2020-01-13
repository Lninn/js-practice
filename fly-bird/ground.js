const Ground = function(app) {
  const o = {
    x: 0,
    y: 0,
    width: 24,
    height: 120,
    speed: -5,
  }

  o.numOfgrounds = app.width / o.width + 1
  o.y = app.height - o.height

  o.update = function() {
    o.x += o.speed
    if (o.x < -o.width) {
      o.x = 0
    }
  }

  o.draw = function() {
    const { numOfgrounds, y, width, height, speed, x } = o
    for (let i = 0; i < numOfgrounds; i++) {
      const _x = i * width + x
      app.ctx.drawImage(app.textures["ground"], _x, y, width, height)
    }
  }

  return o
}
