const Plane = function(game) {
  const img = game.imageByName('plane1')
 
  const o = {
    game,
    x: (800 - 128) / 2,
    y: 600,
    speed: 10,
    bullets: [],
    cooldown: 0,
  }

  o.image = img
  o.w = img.width
  o.h = img.height

  o.setHorizon = function(x) {
    if (x <= 0) {
      o.x = 0
    } else if (x >= 800 - o.w) {
      o.x = 800 - o.w
    } else {
      o.x = x
    }
  }

  o.setVertical = function(y) {
    if (y <= 0) {
      o.y = 0
    } else if (y >= 1000 - o.h) {
      o.y = 1000 - o.h
    } else {
      o.y = y
    }
  }

  o.move = function(key) {
    if (key == 'a') {
      o.setHorizon(o.x -= o.speed)
    } else if (key == 'd') {
      o.setHorizon(o.x += o.speed)
    } else if (key == 'w') {
      o.setVertical(o.y -= o.speed)
    } else if (key == 's') {
      o.setVertical(o.y += o.speed)
    }
  }

  o.fire = function() {
    if (o.cooldown == 0) {
      o.cooldown = 4
      const b = Bullet(o.game, o.x + o.image.width / 2 - 10, o.y)
      o.bullets.push(b)
    }
  }

  o.update = function() {
    if (o.cooldown > 0) {
      o.cooldown -= 1
    }

    for (const b of o.bullets) {
      b.update()
    }
  }

  o.draw = function() {
    o.game.drawImage(o)

    for (const b of o.bullets) {
      b.draw()
    }
  }

  return o
}