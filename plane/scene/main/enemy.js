const Enemy = function(game) {
  const texture = game.textureByName('enemy1')
  const o = {
    game,
    bullets: [],
    cooldown: 0,
  }

  Object.assign(o, texture)

  o.setup = function() {
    o.h -= 23
    o.w -= 25
    o.y = -randomBetween(0, 200)
    o.x = randomBetween(0, 750)
    o.speed = randomBetween(3, 5)
  }

  o.setup()

  o.fire = function() {
    if (o.cooldown == 0) {
      o.cooldown = 4
      const b = Bullet(o.game, o.x + o.image.width / 2 - 10, o.y)
      o.bullets.push(b)
    }
  }

  o.update = function() {
    o.y += o.speed
    if (o.y > 1200) {
      o.setup()
    }

    if (o.cooldown > 0) {
      o.cooldown -= 1
    }

    for (const b of o.bullets) {
      b.update()
    }
  }

  o.draw = function() {
    o.game.ctx.drawImage(o.image, o.x, o.y)

    for (const b of o.bullets) {
      b.draw()
    }
  }

  return o
}
