const enableDebugMode = function(game, enable) {
  if (!enable) {
    return
  }

  game.paused = false

  window.addEventListener('keydown', function(event) {
    const k = event.key

    if (k == 'p') {
      game.paused = !game.paused
    }
  })

  game.enableDrag = false
  game.mouse = function(target) {
    const g = game.canvas

    g.addEventListener('mousedown', function(event) {
      const p = {
        x: event.offsetX,
        y: event.offsetY,
      }

      if (hasPoint(target, p)) {
        game.enableDrag = true
      }
    })

    g.addEventListener('mousemove', function(event) {
      const p = {
        x: event.offsetX,
        y: event.offsetY,
      }

      if (game.enableDrag) {
        target.x = p.x
        target.y = p.y
      }
    })

    g.addEventListener('mouseup', function(event) {
      game.enableDrag = false
    })
  }
}

const App = function(game) {
  const s = SceneTitle(game)
  return s
}

const __main = function() {
  const images = {
    bg1: 'img/bg_1.png',
    bullet1: 'img/bullet_1.png',
    enemy1: 'img/enemy_1.png',
    plane1: 'img/plane_1.png',
  }
  
  const g = Game(images)

  enableDebugMode(g, true)

  g.__start(App)
}

__main()