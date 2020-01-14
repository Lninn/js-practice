const __main = function() {
  const paths = {
    bg: "./img/background.png",
    pipe: "./img/pipe.png",
    bird: "./img/bird.png",
    ground: "./img/ground.png",
  }

  const app = new Application(paths)
  log(app)
  // const bird = new Bird(app)

  const ground = new Ground(app)

  const pipes = new PipeList(app)

//   app.registerAction("j", function() {
//     bird.jump()
//   })

  app.update = function() {
    ground.update()
    pipes.update()
  }

  app.draw = function() {
    pipes.draw()
    ground.draw()
  }

  app.start()
}

__main()

//
