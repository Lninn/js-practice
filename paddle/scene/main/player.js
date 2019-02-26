class Palyer {
  constructor(scene) {
    this.scene = scene

    this.score = 0
    this.lives = 5
    this.level = 1
    this.pass = false

    this.timer = 0

    this.setup() 
  }

  setup() {
    const { boardArea, game, } = this.scene
    
    // 生命
    for (let i = this.lives; i >= 0; i--) {
      const img = Spirit.new(
        game,
        'heart', 
        this.scene.w - boardArea.x * 3  - 35 * i,
        boardArea.y + (boardArea.h - 20) / 2,
        30, 
        30,
      )
      this.scene.addElement(img)
    }
  }

  static new(...args) {
    return new this(...args)
  }

  subLife() {
    this.lifeValue -= 60
  }

  addScore() {
    this.score += 100
  }

  next(scene) {
    // 这个函数只运行一次
    this.timer += 1
    if (this.timer >= 100) {
      this.level += 1
      this.pass = false
      this.timer = 0
      this.lifeValue = 5
      scene.loadLevel()
      scene.ball.reset()
    }
  }

  update() {
    if (this.lifeValue === 0) {
      const s = SceneEnd.new(this.scene.game)
      this.scene.game.replaceScene(s)
    }
  }

  draw() {
    const { boardArea, game, fontSize} = this.scene
    const c = game.context

    if (this.pass) {
      c.fillStyle = "rgba(0, 0, 0, 0.6)"
      c.fillRect(0, 0, this.scene.w, this.scene.h)

      c.fillStyle = "#fff"
      c.font = '60px 微软雅黑'
      const text = '恭 喜 过 关!'
      const t = c.measureText(text).width
      c.fillText(
        text, 
        (this.scene.w-t) / 2, 
        this.scene.h / 2,
        )
    }

    c.fillStyle = "#000"
    c.font = `${fontSize}px 微软雅黑`
    c.fillText(
      `第 ${this.level} 关  分数: ${this.score}`,
      boardArea.x,
      boardArea.y + fontSize + (boardArea.h - fontSize) / 2,
    )

 
  }
}