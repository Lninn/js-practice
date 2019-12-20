const app = App.getInstance()

app.loadResource(function() {
  app.init()

  const puzzle = Puzzle.getInstance(app)

  // 临时
  app.puzzle = puzzle

  puzzle.draw()
})
