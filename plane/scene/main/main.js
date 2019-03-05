class SceneMain extends Scene {
  constructor(ctx) {
    super(ctx)

    this.setup()
    this.init()
  }

  setup() {
    this.bg = Background.new()
    this.plane = Plane.new()
    this.enemys = EnemyList.new(this)

    this.fps = 0

    this.reset()

     // 播放音乐
    //  const audio = new Audio('audio/bgm.mp3')
    //  audio.loop = true
    //  audio.play()
  }

  init() {
    const self = this
    this.keydownEvents = {
      'k': function() {
        self.reset()
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

    this.registerAction('adws', (key) =>{
      this.plane.move(key)
    })

    this.registerAction(' ', () => {
      this.plane.fire()
    })
  }

  reset() {
    this.score = 0
    this.lives = 1000
    this.isProssing = true
  }

  update() {
    if (!config.status.value) {
      return
    }

    this.fps++

    if (this.isProssing) {
      this.bg.update()

      this.plane.update()
  
      this.enemys.update()
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
  
      this.enemys.draw()

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