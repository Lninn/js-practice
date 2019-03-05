class SceneMain extends Scene {
  constructor(ctx) {
    super(ctx)

    this.setup()
    this.init()
  }

  setup() {
    this.bg = Background.new()
    this.plane = Plane.new()
    
    this.enemys = []
    this.enemyOfNumMax = 5

    this.score = 0
    this.lives = 1000

    this.fps = 0

    this.isProssing = true

     // 播放音乐
    //  const audio = new Audio('audio/bgm.mp3')
    //  audio.loop = true
    //  audio.play()

    const self = this
    this.keydownEvents = {
      'k': function() {
        self.playOn()
      }
    }

    window.addEventListener('keydown', function(e) {
      const k = e.key

      const keys = Object.keys(self.keydownEvents)
      for (const key of keys) {
        if (key == k) {
          self.keydownEvents[k]()
        }
      }
    })
  }

  init() {
    this.registerAction('adws', (key) =>{
      this.plane.move(key)
    })

    this.registerAction(' ', () => {
      this.plane.fire()
    })
  }

  generateEnemys() {
    if (this.fps % 10 == 0 && this.enemys.length < this.enemyOfNumMax) {
      const e = Enemy.new()
      this.enemys.push(e)
    }
  }

  remove(list, target) {
    this[list].splice(this[list].indexOf(target), 1)
    this.removeElement(target)
  }

  reduceHealth() {
    if (this.lives <= 0) {
      this.isProssing = false
      this.enemys = []
    } else {
      this.enemys = []
      this.lives -= 100
    }
  }

  playOn() {
    this.isProssing = true
  }

  update() {
    if (!config.status.value) {
      return
    }

    if (this.isProssing) {
      this.bg.update(this.ctx)

      this.plane.update(this.ctx)
  
      this.generateEnemys()
      
      for (const e of this.enemys) {
        if (!e.alive) {
          this.enemys.splice(this.enemys.indexOf(e), 1)
        } else if (e.collide(this.plane)) {
          e.playAnimation()
          this.score += 100
        } else if (intersect(e, this.plane)) {
          this.reduceHealth()
        } else {
          e.update()
        }
      }
    } else {
      
    }
  }

  draw() {
    this.bg.draw(this.ctx)

    const c = this.ctx
    if (!this.isProssing) {

      c.fillStyle = 'rgba(0, 0, 0, 0.2)'
      c.fillRect((config.w.value - 400) / 2, config.h.value / 2 - 100, 400, 300)

      let text = '挑战失败'
      let w = c.measureText(text).width
      c.fillStyle = "#fff"
      c.font = `30px 微软雅黑`
      c.fillText(
        text,
        (config.w.value - w) / 2,
        config.h.value / 2 - 100 + 50,
      )

      text = '重新开始 (K)'
      w = c.measureText(text).width
      c.fillText(
        text,
        (config.w.value - w) / 2,
        config.h.value / 2 + 50,
      )
    } else {
      this.plane.draw(this.ctx)
  
      for (const e of this.enemys) {
        e.draw(this.ctx)
      }

      let text = '分数: ' + this.score      
      let w = c.measureText(text).width
      c.fillStyle = "#fff"
      c.font = `20px 微软雅黑`
      c.fillText(
        text,
        config.w.value - w - 30,
        30,
      )

      text = '生命值: ' + this.lives
      w = c.measureText(text).width
      c.fillStyle = "#fff"
      c.font = `20px 微软雅黑`
      c.fillText(
        text,
        30,
        30,
      )
    }
  }
}