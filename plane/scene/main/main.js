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
    this.fps = 0
    this.animations = []
    this.isLose = false

     // 播放音乐
     const audio = new Audio('audio/bgm.mp3')
     audio.loop = true
     audio.play()

    this.addElement(this.bg)
    this.addElement(this.plane)
  }

  init() {
    this.registerAction('adws', (key) =>{
      this.plane.move(key)
    })

    this.addEvent('k', () => {
      this.isLose = false
    })
  
    this.registerAction(' ', () => {
      this.plane.fire()
    })
  }

  generateEnemys() {
    if (this.fps % 10 == 0 && this.enemys.length < this.enemyOfNumMax) {
      const e = Enemy.new()
      this.enemys.push(e)
      this.addElement(e)
    }
  }

  playAnimation({ x, y }) {
    const a = AnimationStateless.new(x, y)
    this.animations.push(a)
    this.addElement(a)
  }

  remove(list, target) {
    this[list].splice(this[list].indexOf(target), 1)
    this.removeElement(target)
  }

  lose() {
    this.isLose = true
    this.enemys = []
    this.animations = []
    this.elements = []
  }

  update() {
    if (!config.status.value) {
      return
    }

    if (this.isLose) {
      return
    }

    this.generateEnemys()

    for (const e of this.enemys) {
      if (e.collide(this.plane)) {
        this.playAnimation(e)
        this.remove('enemys', e)
        this.score += 100
      }

      if (intersect(e, this.plane)) {
        this.lose()
      }
    }

    super.update()

    for (const animation of this.animations) {
      if (!animation.alive) {
        this.remove('animations', animation)
      }
    }
  }

  draw() {
    super.draw()

    if (this.isLose) {
      const c = this.ctx

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
    }
  }
}