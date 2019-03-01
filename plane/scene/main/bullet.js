const Bullet = function(game, x, y) {
  const img = game.imageByName('bullet1')
  const o = {
    game,
    speed: config.bullet_speed,
    x,
    y,
  }

  o.image = img
  o.w = img.width
  o.h = img.height
  
  if (o.game.mouse) {
    o.game.mouse(o)
  }

  o.update = function() {
    o.speed = config.bullet_speed
    o.y -= o.speed
  }

  o.draw = function() {
    o.game.ctx.drawImage(o.image, o.x, o.y)
  }

  return o
}