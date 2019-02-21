const Game = function() {
  const canvas = e('#id-canvas')
  const o = {
    canvas,
    ctx: canvas.getContext('2d'),
    actions: {},
    keydowns: {},
    fps: 60,
  }
 
  o.init = function() {
    window.addEventListener('keydown', event => {
      const k = event.key
      this.keydowns[k] = true
    })
    
    window.addEventListener('keyup', event => {
      const k = event.key
      this.keydowns[k] = false
    })
  }

  o.runloop = function() {
    const self = this

    setTimeout(function() {
      // event
      const keys = Object.keys(self.actions)
      for (const key of keys) {
        if (self.keydowns[key]) {
          self.actions[key]()
        }
      }

      self.update()

      // clear
      self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height)

      // draw
      self.draw()

      setTimeout(function() {
        self.runloop()
      }, 1000 / self.fps)
    }, 1000 / self.fps)
  }

  o.registerAction = function(key, action) {
    o.actions[key] = action
  }

  o.__start = function() {
    o.init()
    o.runloop()
  }

  return o
}

const Bullet = function(game, x, y) {
  const img = imageFromPath('bullet_1.png')
  const o = {
    game,
    image: img,
    speed: 5,
    x,
    y,
  }

  o.update = function() {
    o.y -= o.speed
  }

  o.draw = function() {
    o.game.ctx.drawImage(o.image, o.x, o.y)
  }

  return o
}

const Plane = function(game) {
  const img = imageFromPath('plane_1.png')
  const o = {
    game,
    image: img,
    x: (800 - 128) / 2,
    y: 600,
    speed: 10,
    bullets: [],
    cooldown: 0,
  }

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

const Enemy = function(game) {
  const img = imageFromPath('enemy_1.png')
  const o = {
    game,
    image: img,
    x: between(60, 700),
    y: between(-500, 0),
    speed: 5,
    bullets: [],
    cooldown: 0,
  }

  o.move = function() {
    if (o.y > 1100) {
      o.y = -200
      o.x = between(60, 700)
    }

    o.y += o.speed
  }

  o.fire = function() {
    if (o.cooldown == 0) {
      o.cooldown = 4
      const b = Bullet(o.game, o.x + o.image.width / 2 - 10, o.y)
      o.bullets.push(b)
    }
  }

  o.update = function() {
    o.move()

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

const __main = function() {
  const game = Game()

  const plane = Plane(game)

  let enemys = []
  let enemyOfNumber = 6
  for (let i = 0; i < enemyOfNumber; i++) {
    const e = Enemy(game)
    enemys.push(e)
  }

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

  game.update = function() {
    plane.update()

    for (const e of enemys) {
      e.update()
    }
  }

  game.draw = function() {
    // bg
    game.ctx.fillStyle = '#553'
    game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height)

    plane.draw()

    for (const e of enemys) {
      e.draw()
    }
  }

  game.__start()
}

__main()