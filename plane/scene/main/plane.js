const Plane = function(game) {
  const texture = game.textureByName('plane1')
 
  const o = {
    game,
    x: (800 - 128) / 2,
    y: 600,
    speed: 10,
    bullets: [],
    cooldown: 0,
  }
  Object.assign(o, texture)

  o.moveUp = function() {
    o.y -= o.speed
  }

  o.moveDown = function() {
    o.y += o.speed
  }

  o.moveLeft = function() {
    o.x -= o.speed
  }

  o.moveRight = function() {
    o.x += o.speed
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
    o.game.ctx.drawImage(o.image, o.x, o.y)

    for (const b of o.bullets) {
      b.draw()
    }
  }

  return o
}