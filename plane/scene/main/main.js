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

  update() {
    if (!config.status.value) {
      return
    }

    this.generateEnemys()

    for (const e of this.enemys) {
      if (e.collide(this.plane)) {
        this.enemys.splice(this.enemys.indexOf(e), 1)
        this.removeElement(e)
        this.score += 100   

         
      }
    }

    super.update()
  }
}