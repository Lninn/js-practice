const SceneTitle = function(game) {
  const o = {
    game,
  }

  const img = Texture.new(o.game, 'explosion1')
  Object.assign(o, img)

  const animation = StatelessAnimation.new(o.game, 'explosion1')

  o.update = function() {
    animation.update()
  }

  o.draw = function() {
    animation.draw()
  }

  return o
}