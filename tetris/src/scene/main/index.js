import {
  KEY_CODES_ALPHABET,
  KEY_CODES_ARROW,
  SIDE_OF_LENGTH,
  Config,
} from '../../constant'

import Shape from './Shape'
import Board from './Board'
import Scene from '../Scene'
import EndScene from '../end'
import Animation from './Animaiton'

export default class GameScene extends Scene {
  constructor(app) {
    super(app)

    this.setup()
    this.register()
  }

  setup() {
    const { app } = this

    const board = new Board(this)
    const shape = new Shape(board)
    const animation = new Animation(app)

    this.board = board
    this.shape = shape
    this.animation = animation

    this.fps = 1
  }

  register() {
    const { app, shape } = this

    const self = this
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
      self.update()
    })

    app.registerOfAction(KEY_CODES_ARROW.LEFT, function (e) {
      shape.moveLeft()
    })

    app.registerOfAction(KEY_CODES_ARROW.RIGHT, function (e) {
      shape.moveRight()
    })

    app.registerOfAction(KEY_CODES_ARROW.TOP, function (e) {
      shape.moveUp()
    })

    app.registerOfAction(KEY_CODES_ARROW.BOTTOM, function (e) {
      self.update()
    })
  }

  updateForAnimation() {
    const { board, animation, shape } = this

    animation.next()

    if (animation.isTail()) {
      board.updateWithYAxes()
      animation.close()
      shape.reset()
    }
  }

  update() {
    const { board, shape, animation, app } = this

    if (animation.isAnimation) {
      this.updateForAnimation()
    } else {
      if (
        shape.y + shape.height >= Config.CanvasHeight ||
        board.isValidOfPreDown(shape.points)
      ) {
        board.updateFlagWithPoints(shape.points)

        const flaggedYAxes = board.getFlaggedOfYAxes()
        if (flaggedYAxes.length) {
          animation.open()
        } else {
          if (shape.y === 0) {
            app.replaceScene(new EndScene(app))
          } else {
            shape.reset()
          }
        }
      } else {
        shape.update()
      }
    }
  }

  draw() {
    const { board, shape, app, animation } = this
    const { context } = app

    board.draw(context)

    if (!animation.isAnimation) {
      shape.draw(context)
    }

    drawBoard(context)
  }
}

function drawBoard(context) {
  const w = Config.CanvasWidth
  const h = Config.CanvasHeight
  const step = SIDE_OF_LENGTH - 0.1

  let i = 0

  context.save()
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
  context.restore()
}
