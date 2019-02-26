class SceneMain extends Scene {
  constructor(game) {
    super(game)

    this.init()
  }

  init() {
    this.paused = false

    const g = this.game
    this.paddle = Paddle.new(g, 'paddle1')
    this.ball = Ball.new(g, 'ball1')
    this.player = Palyer.new(this)
    this.bg = Spirit.new(g, 'bg1')

    // blocks
    this.blocks = []
    this.numOfBlock = 0

    this.setKeydownEvent()

    this.addElement(this.bg)
    this.addElement(this.paddle)
    this.addElement(this.ball)
    this.addElement(this.player)
    this.load()
  }

  setKeydownEvent() {
    const self = this
    this.registerAction('a', function() {
      if (!self.player.pass && !self.paused) {
        self.paddle.moveLeft()
      }
    })
  
    this.registerAction('d', function() {
      if (!self.player.pass && !self.paused) {
        self.paddle.moveRight()
      }
    })
  
    this.registerAction('f', function() {
      self.ball.fire()
    })

    this.addKEvent('p', function() {
      self.pause()        
    })

    this.addKEvent('y', function() {
      self.paused = false        
    })

    this.addKEvent('n', function() {
      const s = SceneTitle.new(self.game)
      self.game.replaceScene(s)        
    })
  }

  load(num = 1) {
    this.blocks = []

    const data = getDataFromLS('LEVELS') || []
    const points = data[num] || []
   
    this.numOfBlock = points.length
    for (const point of points) {
      this.addBlock(point)
    }
  }

  addBlock(point) {
    const b = Block.new(this.game, 'blockRed', point)
    this.blocks.push(b)
    this.addElement(b)
  }

  pause() {
    // log('暂停游戏')
    this.paused = true
  }

  update() {
    super.update()

    if (this.paused || this.player.pass) {
      return
    }

    // blocks
    this.blocks.forEach(function(block) {
      if (block.collide(this.ball)) {  
        // 播放音效
        var horn = new Audio('audio/water.mp3')
        horn.play()

        block.kill()
        this.ball.rebound(block)
        this.player.addScore()
        // 如果 alive false 表示减少一个
        if (!block.alive) {
          this.numOfBlock -= 1
        }
      }
    }, this)

    if (this.numOfBlock === 0) {
      this.player.pass = true
    }
    
    // 3 是否满足当前游戏结束条件
    if (this.ball.y > this.paddle.y) {
      this.player.subLife()
      this.ball.reset()
    }

    this.ball.move(this.boardArea.h)

    if (this.paddle.collide(this.ball)) {
      this.ball.rebound(this.paddle)
    }
  }
}