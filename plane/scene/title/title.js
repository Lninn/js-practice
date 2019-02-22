const SceneTitle = function(game) {
  const o = {
    game,
  }

  // event
  game.registerAction('k', function() {
    const s = Scene(game)
    game.replaceScene(s)
  })

  o.update = function() {
  }

  o.draw = function() {
    const c = game.ctx
    // bg
    c.fillStyle = '#553'
    c.fillRect(0, 0, game.canvas.width, game.canvas.height)

    // text
    c.fillStyle = "white"
    c.font = '50px 黑体'
    const text = '按 k 开始游戏' 
    c.fillText(text, game.canvas.width / 3.3, 500)
  }

  return o
}