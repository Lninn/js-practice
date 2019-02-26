class SceneMain extends Scene {
  constructor(game) {
    super(game)

    this.paddle = Paddle.new(game, 'paddle1')
    this.ball = Ball.new(game, 'ball1')
    this.player = Palyer.new(this)
    this.bg = Spirit.new(game, 'bg1')

    // blocks
    this.blocks = []
    this.numOfBlock = 0
    this.fontSize = 30
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
    
    this.addElement(this.bg)
    this.addElement(this.paddle)
    this.addElement(this.ball)
    this.loadLevel()

    // 拖动功能
    let enableDrag = false
    this.game.canvas.addEventListener('mousedown', function(event) {
      const point = {
        x: event.offsetX,
        y: event.offsetY,
      }
   
      // if (self.ball.hasPoint(x, y)) {
      //   enableDrag = true
      // }
      if (hasPoint(self.ball, point)) {
        enableDrag = true
      }
    })

    this.game.canvas.addEventListener('mousemove', function(event) {
      const x = event.offsetX
      const y = event.offsetY 
      
      if (enableDrag) {
        self.ball.x = x
        self.ball.y = y
      }
    })

    this.game.canvas.addEventListener('mouseup', function(event) {
      enableDrag = false
    })
  }

  loadLevel() {
    this.blocks = []

    const data = JSON.parse(localStorage.getItem('LEVELS'))
    const level = data[this.player.level] || []
   
    this.numOfBlock = level.length

    level.forEach(function(point) {
      const b = Block.new(this.game, 'blockRed', point)
      this.blocks.push(b)
      this.addElement(b)
    }, this)
  }

  update() {
    // blocks
    this.blocks.forEach(function(block) {
      if (block.collide(this.ball)) {  
        // 播放音效
        var horn = new Audio('audio/water.mp3')
        horn.play()

        block.kill()
        this.ball.rebound(block)
        this.player.addScore()
        this.numOfBlock -= 1
      }
    }, this)

    if (window.paused) {
      return
    }

    this.player.update()

    if (this.player.pass) {
      this.player.next(this)
      return
    }

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

  draw() {
    super.draw()
    
    this.player.draw()
  }
}