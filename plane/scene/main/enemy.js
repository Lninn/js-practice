class Enemy extends AnimationStateless {
  constructor() {
    super('enemy1')

    this.soundEffect = new Audio('audio/boom.mp3')
    this.alive = true

    this.animationName = 'explosion1'
    this.setup()
  }

  setup() {
    this.y = -randomBetween(200, 300)
    this.x = randomBetween(0, config.w.value - this.w)
    this.speed = randomBetween(2, 4)
  }

  update () {
    if (this.isPlaying) {
      super.update()
    } else {
      this.y += this.speed
      if (this.y > config.h.value) {
        this.setup()
      }
    }
  }

  collide(plane) {
    for (const b of plane.bullets) {
      if (intersect(this, b) && ! this.isPlaying) {
        b.alive = false
        // 播放音乐
        this.play() 
        return true
      }
    }
   
    return false
  }

  play() {
    this.soundEffect.play()
  }
}

class EnemyList{
  constructor(scene) {
    this.scene = scene

    this.enemyOfNumMax = 5
    this.list = []
  }

  static new(...args) {
    return new this(...args)
  }

  generate() {
    if (this.scene.fps % 10 == 0 && this.list.length < this.enemyOfNumMax) {
      const e = Enemy.new()
      this.list.push(e)
    }
  }

  update() {
    this.generate()

    for (const e of this.list) {
      if (!e.alive) {
        this.list.splice(this.list.indexOf(e), 1)
      } else if (e.collide(this.scene.plane)) {
        e.playAnimation()
        this.scene.score += 100
      } else if (intersect(e, this.scene.plane)) {
        if (this.scene.lives <= 100) {
          this.scene.isProssing = false
        } else {
          this.scene.lives -= 100
        }
        
        this.list = []
      } else {
        e.update()
      }
    }
  }

  draw() {
    for (const e of this.list) {
      e.draw(this.scene.ctx)
    }
  }
}