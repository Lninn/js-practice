class Palyer {
  constructor(scene) {
    this.scene = scene

    this.setup() 
  }

  setup() {
    this.score = 0
    this.lives = 5
    this.level = 1
    this.pass = false
    this.timer = 0
    this.timeInterval = 100

    this.fontSize = 30
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

  next() {
    if (this.timer >= this.timeInterval) {
      this.level += 1
      this.pass = false
      this.lifeValue = 5
      this.timer = 0
      this.scene.load(this.level)
      this.scene.ball.reset()
    } else {
      this.timer += 1
    }
  }

  update() {
    if (this.lifeValue === 0) {
      const s = SceneEnd.new(this.scene.game)
      this.scene.game.replaceScene(s)
    }

    if (this.pass) {
      this.next()
    }
  }

  draw() {
    // log('player draw')
    const { boardArea, game, drawArea, } = this.scene
    const c = game.context

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
      img.draw()
    }

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
    c.font = `${this.fontSize}px 微软雅黑`
    c.fillText(
      `第 ${this.level} 关  分数: ${this.score}`,
      boardArea.x,
      boardArea.y + this.fontSize + (boardArea.h - this.fontSize) / 2,
    )

    if (this.scene.paused) {
      // log('暂停画面')
      const tipBoard = {
        color: 'rgba(0, 0, 0, 0.3)',
        x: 80,
        y: 400,
        w: game.w - 2 * 80,
        h: 300,
      }

      drawArea(tipBoard)

      c.fillStyle = "#fff"
      c.font = '40px 微软雅黑'
      let text = '是否继续本局游戏 ?'
      let l1 = c.measureText(text).width
      c.fillText(
        text, 
        (game.w-l1) / 2, 
        game.h / 2,
      )

      text = 'Yes(Y)'
      let l2 = c.measureText(text).width
      c.fillText(
        text, 
        (game.w - l1 - l2 / 2) / 2, 
        game.h / 2 + 100,
      )

      text = 'No(N)'
      let l3 = c.measureText(text).width
      c.fillText(
        text, 
        (game.w + l1 - l3 * 1.5) / 2, 
        game.h / 2 + 100,
      )
    }
  }
}
