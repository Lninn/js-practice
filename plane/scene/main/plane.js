class Plane extends Spirit {
  constructor() {
    super('plane1')

    this.setup()
  }

  setup() {
    this.x = (config.w.value - this.w) / 2
    this.y = (config.h.value) - this.h
    this.speed = config.plane_speed.value

    this.bullets = []
    this.cooldown = 0
  }

  setHorizon(x) {
    if (x <= 0) {
      x = 0
    } else if (x >= config.w.value - this.w) {
      x = config.w.value - this.w
    }

    this.x = x
  }

  setVertical(y) {
    if (y <= 0) {
      y = 0
    } else if (y >= config.h.value - this.h) {
      y = config.h.value - this.h
    }
    
    this.y = y
  }
  
  move(key) {
    if (!config.status.value) {
      return
    }

    if (key == 'a') {
      this.setHorizon(this.x -= this.speed)
    } else if (key == 'd') {
      this.setHorizon(this.x += this.speed)
    } else if (key == 'w') {
      this.setVertical(this.y -= this.speed)
    } else if (key == 's') {
      this.setVertical(this.y += this.speed)
    }
  }

  fire() {
    if (this.cooldown == 0) {
      // 播放音乐
      const audio = new Audio('audio/bullet.mp3')
      audio.play()

      this.cooldown = config.bullet_cooldown.value
      const b = Bullet.new('bullet1', this.x + this.w / 2, this.y)
      this.bullets.push(b)
    }
  }

  update() {
    this.speed = config.plane_speed.value

    if (this.cooldown > 0) {
      this.cooldown -= 1
    }

    for (const b of this.bullets) {
      b.update()

      if (b.y < 0 || !b.alive) {
        this.removeBullet(b)
      }
    }
  }

  removeBullet(b) {
    this.bullets.splice(this.bullets.indexOf(b), 1)
  }

  draw(ctx) {
    super.draw(ctx)

    for (const b of this.bullets) {
      b.draw(ctx)
    }
  }
}