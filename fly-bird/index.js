const __main = function() {
  const paths = {
    bg: "./img/background.png",
    pipe: "./img/pipe.png",
    bird: "./img/bird.png",
    ground: "./img/ground.png",
  }

  const App = Application({ paths })
  log(App)

  const bird = Bird(App)

  const ground = Ground(App)

  const pipe = new Pipe(App)
  // const pipes = []
  // const numOfPipes = 5
  // for (var i = 0; i < numOfPipes; i++) {
  //   const p = new Pipe(App)
  //   pipes.push(p)
  // }
  // log('pipes ', pipes)

  App.registerAction(" ", function() {
    bird.jump()
  })
  // window.addEventListener('click', function() {
  //   bird.jump()
  // })

  App.update = function() {
    pipe.update()
    // bird.update()
    // if (App.end) {
    //   return
    // }
    // ground.update()
    // pipes.forEach(p => {
    //   p.update(bird)
    // })
  }

  App.draw = function() {
    pipe.draw()
    // bird.draw()
    // ground.draw()
    // App.ctx.font = '60px serif'
    // App.ctx.strokeStyle = 'white'
    // App.ctx.strokeText(score, App.width / 2, 120)
  }

  App.start()

  // log('main end')
}

__main()

//
