let __DEV__ = true

const app = App.getInstance()

app.loadResource(function() {
  app.setCanvasSize()

  const puzzle = Puzzle.getInstance(app)

  puzzle.draw()
})
