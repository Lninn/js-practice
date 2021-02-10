import {
  KEY_CODES_ALPHABET,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  SIDE_OF_LENGTH,
  Config,
} from './constant'

import Shape from './Shape'
import Board from './Board'

class Scence {
  constructor(app) {
    this.app = app
  }

  update() {}

  draw() {}
}

class StartScence extends Scence {
  constructor(context) {
    super(context)

    this.setup()
  }

  setup() {
    this.animation = new Animation()
  }

  update() {
    this.animation.update()
  }

  draw() {
    this.animation.draw(this.context)
  }
}

export class GameScence extends Scence {
  constructor(app) {
    super(app)

    this.setup()
    this.register()
  }

  setup() {
    const board = Board.getInstance()
    const shape = Shape.getInstance(board)

    this.board = board
    this.shape = shape
  }

  register() {
    const { app, shape } = this

    app.registerOfAction(KEY_CODES_ALPHABET.LEFT, function (e) {
      shape.moveLeft()
    })

    app.registerOfAction(KEY_CODES_ALPHABET.RIGHT, function (e) {
      shape.moveRight()
    })

    app.registerOfAction(KEY_CODES_ALPHABET.SPACE, function (e) {
      shape.transpose()
    })

    app.registerOfAction(KEY_CODES_ALPHABET.TOP, function (e) {
      shape.moveUp()
    })

    app.registerOfAction(KEY_CODES_ALPHABET.BOTTOM, function (e) {
      shape.update()
    })
  }

  update() {
    const { shape } = this

    shape.update()
  }

  draw() {
    const { board, shape, app } = this

    board.draw(app.context)
    shape.draw(app.context)

    drawBoard(app.context)
  }
}

function drawBoard(context) {
  const w = CANVAS_WIDTH
  const h = CANVAS_HEIGHT
  const step = SIDE_OF_LENGTH - 0.1

  let i = 0

  // draw vertical line
  for (; i <= w; i += step) {
    context.moveTo(0.5 + i, 0)
    context.lineTo(0.5 + i, h)
  }

  // draw horizontal line
  for (i = 0; i <= h; i += step) {
    context.moveTo(0, 0.5 + i)
    context.lineTo(w, 0.5 + i)
  }

  const strokeStyle = context.strokeStyle

  context.strokeStyle = Config.board.strokeStyle
  context.stroke()

  context.strokeStyle = strokeStyle
}
