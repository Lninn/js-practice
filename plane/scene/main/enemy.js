class Enemy extends Spirit {
  constructor() {
    super('enemy1')

    this.soundEffect = new Audio('audio/boom.mp3')
    this.alive = true

    this.setup()
  }

  setup() {
    this.y = -randomBetween(200, 300)
    this.x = randomBetween(0, config.w.value - this.w)
    this.speed = randomBetween(2, 4)
  }

  update () {
    this.y += this.speed
    if (this.y > config.h.value) {
      this.setup()
    }
  }

  collide(plane) {
    for (const b of plane.bullets) {
      if (intersect(this, b)) {
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