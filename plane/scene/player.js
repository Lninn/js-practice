class Player {
  constructor(game, scene) {
    this.game = game
    this.scene = scene

    this.setup()
    this.init()
  }

  static new(...args) {
    return new this(...args)
  }

  setup() {
    this.plane = Plane(this.game)
  
    this.enemys = []
    this.enemyOfNumMax = 10
    
    this.score = 0
    this.fps = 0

    this.animations = []
  }

  init() {
    const plane = this.plane
    this.scene.registerAction('adws', function(key) {
      plane.move(key)
    })
  
    this.scene.registerAction(' ', function() {
      plane.fire()
    })
  }

  generateEnemys() {
    if (this.fps % 10 == 0 && this.enemys.length < this.enemyOfNumMax) {
      const e = Enemy(this.game)
      this.enemys.push(e)
    }
  }

  update() {
    this.fps++

    // if (this.fps % 150 == 0) {
    //   for (let i = 0; i < 3; i++) {
    //     this.animations.splice(i, 1)
    //   }
    // }

    this.generateEnemys()

    this.plane.update()

    for (const animation of this.animations) {
      animation.update()
    }

    for (const e of this.enemys) {
      e.update()

      if (e.collide(this.plane)) {
        this.enemys.splice(this.enemys.indexOf(e), 1)
        this.score += 100

        this.animations.push(
          StatelessAnimation.new(this.game, 'explosion1', e.x, e.y)
        )
      }
    }
  }

  draw() {
    this.plane.draw()

    for (const e of this.enemys) {
      e.draw()
    }

    for (const animation of this.animations) {
      animation.draw()
    }
  }
}