const enableDebugMode = function(enable, game) {
  if (!enable) {
    return
  }

  window.fps = 30
  window.paused = false
  window.blocks = []

  const levelLoad = function(n) {
    const blocks = []
    n = n - 1
    const level = levels[n]
    
    for (let i = 0; i < level.length; i++) {
      const p = level[i]
      const b = Block.new(game, p)
      blocks.push(b)
    }

    return blocks
  }

  blocks = levelLoad(1)

  window.addEventListener('keydown', function(event) {
    const k = event.key

    if ('123456'.includes(k)) {
      blocks = levelLoad(Number(k))
    } else if (k === 'p') {
      window.paused = !window.paused
    }
  })

  // e('#id-input-speed').addEventListener('input', function(event) {
  //   const target = event.target
  //   window.fps = target.value
  // })

  // 可以拖动 ball
  // let enableDrag = false
  // this.game.canvas.addEventListener('mousedown', function(event) {
  //   const x = event.offsetX
  //   const y = event.offsetY  
    
  //   if (self.ball.hasPoint(x, y)) {
  //     enableDrag = true
  //   }
  // })

  // this.game.canvas.addEventListener('mousemove', function(event) {
  //   const x = event.offsetX
  //   const y = event.offsetY 
    
  //   if (enableDrag) {
  //     self.ball.x = x
  //     self.ball.y = y
  //   }
  // })

  // this.game.canvas.addEventListener('mouseup', function(event) {
  //   enableDrag = false
  // })
}

const __main = function() {
  const images = {
    paddle: 'img/paddle.png',
    ball: 'img/ball.png',
    block: 'img/block.png',
    heart: 'img/heart.png',
    titleBg: 'img/title_bg.png',
    mainBg: 'img/main_bg.png',
    editorBg: 'img/editor_bg.png',
  }

  Game.instance(images, function(game) {
    enableDebugMode(false, game)
    
    const s = SceneTitle.new(game)
    // const s = SceneMain.new(game)
    game.runWithScene(s)
  })
}

__main()