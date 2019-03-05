class Enemy extends AnimationStateless {
  constructor() {
    super('explosion1')

    this.soundEffect = new Audio('audio/boom.mp3')
    this.alive = true

    this.staticImage = config.images['enemy1']
    this.w = this.staticImage.width
    this.h = this.staticImage.height

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