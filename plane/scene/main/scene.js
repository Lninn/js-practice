const Scene = function(game) {
  const o = {
    game,
  }

  const plane = Plane(game)

  let enemys = []
  let enemyOfNumber = 10
  for (let i = 0; i < enemyOfNumber; i++) {
    const e = Enemy(game)
    enemys.push(e)
  }

  let score = 0

  // event
  game.registerAction('a', function() {
    plane.moveLeft()
  })

  game.registerAction('d', function() {
    plane.moveRight()
  })

  game.registerAction('w', function() {
    plane.moveUp()
  })

  game.registerAction('s', function() {
    plane.moveDown()
  })

  game.registerAction(' ', function() {
    plane.fire()
  })

  o.collide = function() {
    for (const b of plane.bullets) {
      for (const e of enemys) {
        if (intersect(b, e)) {
          enemys.splice(enemys.indexOf(e), 1)
          plane.bullets.splice(plane.bullets.indexOf(b), 1)
          score += 100
        }
      }
    }
  }

  o.update = function() {
    o.collide()

    if (game.paused) {
      return
    }

    plane.update()

    for (const e of enemys) {
      e.update()
      if (intersect(plane, e)) {
        const s = SceneEnd(game)
        game.replaceScene(s)
      }
    }
    
  }

  o.draw = function() {
    const c = game.ctx
    // bg
    c.fillStyle = '#553'
    c.fillRect(0, 0, game.canvas.width, game.canvas.height)

    plane.draw()

    for (const e of enemys) {
      e.draw()
    }

    // text
    c.fillStyle = "white"
    c.font = '16px 黑体'
    c.fillText(`分数: ${score}`, 700, 30)
  }

  return o
}