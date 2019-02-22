const Bullet = function(game, x, y) {
  const texture = game.textureByName('bullet1')
  const o = {
    game,
    speed: 5,
    x,
    y,
  }

  Object.assign(o, texture)

  if (o.game.mouse) {
    o.game.mouse(o)
  }

  o.update = function() {
    o.y -= o.speed
  }

  o.draw = function() {
    o.game.ctx.drawImage(o.image, o.x, o.y)
  }

  return o
}