let __DEV__ = true

const app = App.getInstance()
const defaultName = 'img1'

app.loadResource(function() {
  app.init(defaultName)

  const puzzle = Puzzle.getInstance(app)

  // 临时
  app.puzzle = puzzle

  printSource(puzzle.blocks)

  puzzle.draw()
})
