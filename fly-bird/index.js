const __main = function() {
  const paths = {
    bg: "./img/background.png",
    pipe: "./img/pipe.png",
    bird: "./img/bird.png",
    ground: "./img/ground.png",
  }

  const app = new Application(paths)
  log(app)

  const bird = new Bird(app)

  const ground = new Ground(app)

  const pipes = new PipeList(app)

  window.addEventListener("keydown", e => {
    const key = e.key
    if (key == "j") {
      bird.jump()
    }
  })

  app.update = function() {
    ground.update()
    pipes.update()
    bird.update()
  }

  app.draw = function() {
    ground.draw()
    pipes.draw()
    bird.draw()
  }

  app.start()
}

__main()

//
