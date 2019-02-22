const SceneTitle = function(game) {
  const bg = game.textureByName('bg1')
  const o = {
    game,
    y: 0,
    y2: 1000,
  }

  Object.assign(o, bg)

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
    c.drawImage(o.image, 0, o.y, 800, 2048)
   
    // text
    c.fillStyle = "white"
    c.font = '50px 黑体'
    const text = '按 k 开始游戏' 
    c.fillText(text, game.canvas.width / 3.3, 500)
  }

  return o
}