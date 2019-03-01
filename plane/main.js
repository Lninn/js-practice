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

const App = function({ ctx }) {
  const s = SceneMain.new(ctx)
  return s
}

const __main = function() {
  const g = Game.instance()

  enableDebugMode(g, true)

  g.__start(App)
}

__main()