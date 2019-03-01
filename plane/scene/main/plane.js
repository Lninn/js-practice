const Plane = function(game) {
  const img = game.imageByName('plane')
  const o = {
    game,
    x: (config.w.value) / 2,
    y: 600,
    speed: config.plane_speed.value,
    bullets: [],
    cooldown: 0,
  }

  o.image = img
  o.w = img.width
  o.h = img.height

  // const animation = Animation.new(game, 'plane')
  // animation.x = o.x
  // animation.y = o.y

  o.w = 100
  o.h = 100

  o.setHorizon = function(x) {
    if (x <= 0) {
      x = 0
    } else if (x >= config.w.value - o.w) {
      x = config.w.value - o.w
    }

    o.x = x
  }

  o.setVertical = function(y) {
    if (y <= 0) {
      y = 0
    } else if (y >= config.h.value - o.h) {
      y = config.h.value - o.h
    }
    
    o.y = y
  }

  o.move = function(key) {
    if (!config.status.value) {
      return
    }
   
    if (key == 'a') {
      o.setHorizon(o.x -= o.speed)
    } else if (key == 'd') {
      o.setHorizon(o.x += o.speed)
    } else if (key == 'w') {
      o.setVertical(o.y -= o.speed)
    } else if (key == 's') {
      o.setVertical(o.y += o.speed)
    }

    // animation.setDir(key)
  }

  o.fire = function() {
    if (o.cooldown == 0) {
      o.cooldown = config.bullet_cooldown.value
      const b = Bullet(o.game, o.x + o.w / 2 - 10, o.y)
      o.bullets.push(b)
    }
  }

  o.update = function() {
    // animation.update()
    o.speed = config.plane_speed.value

    if (o.cooldown > 0) {
      o.cooldown -= 1
    }

    for (const b of o.bullets) {
      b.update()
    }
  }

  o.draw = function() {
    // animation.draw()
    o.game.drawImage(o)

    for (const b of o.bullets) {
      b.draw()
    }
  }

  return o
}