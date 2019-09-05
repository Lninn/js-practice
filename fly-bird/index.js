const __main = function() {

  const paths = {
    bg: './img/background.png',
    pipe: './img/pipe.png',
    bird: './img/bird.png',
    ground: './img/ground.png',
  }

  const App = Application({ paths })

  const bird = Bird(App)

  const ground = Ground(App)

  const pipes = []
  const numOfPipes = 3
  for (var i = 0; i < numOfPipes; i++) {
    const p = new Pipe(App)
    // 改变 pipe 的 x 坐标
    // p.x = p.x + i * 400
    pipes.push(p)
  }
  // log('pipes ', pipes)

  App.registerAction(' ', function() {
    bird.jump()
  })
  // window.addEventListener('click', function() {
  //   bird.jump()
  // })

  App.update = function() {
    bird.update()
    
    if (App.end) {
      return
    }

    ground.update()

    pipes.forEach(p => {
      p.update(bird)
    })
  }

  App.draw = function() {
    bird.draw()
    ground.draw()
    pipes.forEach(p => {
      p.draw()
    })

    App.ctx.font = '60px serif'
    App.ctx.strokeStyle = 'white'
    App.ctx.strokeText(score, App.width / 2, 120)
  }

  App.start()

  // log('main end')
}

__main()






//
