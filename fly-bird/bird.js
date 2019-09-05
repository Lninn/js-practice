const Bird = function(app) {

  const o = {
    x: (app.width - 92) / 2,
    y: 300,
    width: 92,
    height: 64,
    // 重力
    gy: 9.8,
    gyFactor: 0.025,
    // 加速度
    vy: 0,
    jumpOffset: -7.5,
    degrees: 0,
    // animation
    frames: [0, 92, 184],
    currentFraIdx: 0,
    frameCount: 0,
    numOfFrameTimes: 10,
  }

  o.update = function () {
    if (o.frameCount <= 0) {
      o.currentFraIdx = (o.currentFraIdx + 1) % o.frames.length
      o.frameCount = o.numOfFrameTimes
    }
    o.frameCount -= 1

    this.y += this.vy
    this.vy += this.gy * o.gyFactor

    // 控制转动角度的时间
    if (this.vy > 4.5 && o.degrees < 90) {
      o.degrees += 3
    }

    const h = app.height - 120 - o.height
    if (o.y > h) {
      o.y = h
    }
  }

  o.draw = function() {
    const { currentFraIdx, frames, width, height, x, y, } = o
    const _w = frames[currentFraIdx]

    app.ctx.save()

    const w2 = width / 2
    const h2 = height / 2

    // 以角色的中心旋转
    app.ctx.translate(x + w2, y + h2)

    app.ctx.rotate(o.degrees * Math.PI / 180)

    app.ctx.translate(-w2, -h2)

    app.ctx.drawImage(app.textures['bird'], _w, 0, width, height, 0, 0, width, height)

    app.ctx.restore()

  }

  o.jump = function() {
    o.degrees = -45
    o.vy = o.jumpOffset
  }

  return o
}
