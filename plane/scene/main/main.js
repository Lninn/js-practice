class SceneMain extends Scene {
  constructor(ctx) {
    super(ctx)

    this.setup()
    this.init()
  }

  setup() {
    this.bg = Background.new(this.ctx)
    this.plane = Plane.new(this.ctx)
    
    this.enemys = []
    this.enemyOfNumMax = 10
    this.score = 0
    this.fps = 0

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
      const e = Enemy.new(this.ctx)
      this.enemys.push(e)
    }
  }

  update() {
    super.update()

    this.generateEnemys()

    for (const e of this.enemys) {
      if (e.collide(this.plane)) {
        this.enemys.splice(this.enemys.indexOf(e), 1)
        this.score += 100
        this.addElement(
          AnimationStateless.new(
            this.ctx,
            'explosion1',
            e.x,
            e.y
          )
        )
      } else {
        e.update()
      }
    }
  }

  draw() {
    super.draw()

    for (const e of this.enemys) {
      e.draw()
    }
  }
}