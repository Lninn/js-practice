const Application = function({ paths }) {
  const canvas = e("#id-canvas")
  const ctx = canvas.getContext("2d")

  const { width, height } = canvas

  log("width ", width)
  log("height ", height)

  const o = {
    // App
    width,
    height,
    ctx,
    end: false,
    requestId: null,
    // resources
    paths,
    textures: {},
    // events
    keydowns: {},
    events: {},
  }

  window.addEventListener("keydown", function(e) {
    const k = e.key
    o.keydowns[k] = true
  })

  window.addEventListener("keyup", function(e) {
    const k = e.key
    o.keydowns[k] = false
  })

  o.registerAction = function(key, callback) {
    o.events[key] = callback
  }

  o.run = function() {
    const { ctx, width, height, textures, update, draw, events, keydowns } = o

    // events
    const keys = Object.keys(events)
    keys.forEach(key => {
      if (keydowns[key]) events[key]()
    })

    ctx.clearRect(0, 0, width, height)

    ctx.drawImage(textures["bg"], 0, 0, width, height)

    update()

    draw()

    o.requestId = requestAnimationFrame(o.run)

    // o.check()
  }

  o.start = function() {
    const names = Object.keys(o.paths)
    let loaded = 0
    for (let i = 0, len = names.length; i < len; i++) {
      const name = names[i]
      const img = new Image()
      img.src = paths[name]
      img.onload = function() {
        o.textures[name] = img
        loaded += 1
        if (loaded == names.length) {
          log("imgs loaded ", o.textures)
          o.requestId = requestAnimationFrame(o.run)
        }
      }
    }
  }

  o.update = function() {}

  o.draw = function() {}

  // 控制程序运行的时间
  o.check = (function(times = 300) {
    let count = times

    return function() {
      // log('count ', count)
      count -= 1
      if (count < 0) {
        log("Done!")
        cancelAnimationFrame(o.requestId)
      }
    }
  })()

  return o
}
