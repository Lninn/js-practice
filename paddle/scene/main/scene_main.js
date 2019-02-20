class SceneMain extends Scene {
  constructor(game) {
    super(game)

    this.paddle = Paddle.new(game)
    this.ball = Ball.new(game)
    this.player = Palyer.new(game)

    // blocks
    this.blocks = []
    this.blocksNum = 0
    this.loadLevel()

    this.init()
  }

  init() {
    const self = this

    this.registerAction('a', function() {
      if (!self.player.pass) {
        self.paddle.moveLeft()
      }
    })
  
    this.registerAction('d', function() {
      if (!self.player.pass) {
        self.paddle.moveRight()
      }
    })
  
    this.registerAction('f', function() {
      self.ball.fired = true
    })

    this.elements.push(this.paddle, this.ball)
  }

  loadLevel() {
    this.blocks = []
    const data = JSON.parse(localStorage.getItem('LEVELS'))
    const level = data[this.player.level] || []
   
    this.blocksNum = level.length
    for (let i = 0; i < this.blocksNum; i++) {
      const p = level[i]
      const b = Block.new(this.game, p)
      this.blocks.push(b)
      this.elements.push(b)
    }
  }

  update() {
    this.player.update()

    if (this.player.pass) {
      this.player.next(this)
      return
    }

    if (this.blocksNum === 0) {
      this.player.pass = true
    }
    
    // 3 是否满足当前游戏结束条件
    if (this.ball.y > this.paddle.y) {
      this.player.subLife()
      this.ball.reset()
    }

    this.ball.move(this.headArea.h)

    if (this.paddle.collide(this.ball)) {
      this.ball.rebound(this.paddle)
    }

    // blocks
    this.blocks.forEach(function(block) {
      if (block.collide(this.ball)) {   
        block.kill()
        this.ball.rebound(block)
        this.player.addScore()
        this.blocksNum -= 1
      }
    }, this)
  }

  draw() {
    // bg
    this.drawBg('mainBg')
    this.drawTitle('#4885ed')

    super.draw()

    this.player.draw()
  }
}