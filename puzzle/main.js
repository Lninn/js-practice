let __DEV__ = true

const app = App.getInstance()

app.loadResource(function() {
  app.init("img2")

  const puzzle = Puzzle.getInstance(app)

  printSource(puzzle.blocks)

  puzzle.draw()
})
