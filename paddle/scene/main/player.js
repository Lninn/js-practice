class Palyer {
  constructor(game) {
    this.game = game

    this.score = 0
    this.lifeValue = 180
    this.level = 1
    this.pass = false

    this.timer = 0
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
      this.lifeValue = 180
      scene.loadLevel()
      scene.ball.reset()
    }
  }

  update() {
    if (this.lifeValue === 0) {
      const s = SceneEnd.new(this.game)
      this.game.replaceScene(s)
    }
  }

  draw() {
    const ctx = this.game.context
    if (this.pass) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
      ctx.fillRect(0, 0, 400, 600)

      ctx.fillStyle = "white"
      ctx.font = '34px serif'
      ctx.fillText('恭 喜 过 关!', 110, 300)
    }

    ctx.fillStyle = "white"
    ctx.font = '16px serif'
    const t = '第 ' + this.level + ' 关 分数: ' + this.score
    ctx.fillText(t, 240, 30)

       // 生命
    // img = this.game.imageByName('star')
    // for (let i = 1; i <= this.star; i++) {
    //   ctx.drawImage(img.image, 25 * i, 10)
    // }

    ctx.fillStyle = "#db3236"
    for (let i = 0; i < Math.floor(this.lifeValue / 60); i++) {
      ctx.fillRect(i * 50 + 2, 18, 48, 18)
    }
  }
}