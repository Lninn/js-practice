import {
  KEY_CODES_ALPHABET,
  KEY_CODES_ARROW,
  Config,
  UN_FLAGGED,
} from '../../constant'

import Shape from './Shape'
import Board from './Board'
import Scene from '../Scene'
import EndScene from '../end'
import Animation from './Animaiton'
import { drawBoard } from '../../utils'
import { createStatus } from './status'

export default class GameScene extends Scene {
  constructor(app) {
    super(app)

    this.setup()
    this.register()
  }

  setup() {
    const board = new Board(this)
    const shape = new Shape(board)
    const animation = new Animation(this)

    this.board = board
    this.shape = shape
    this.animation = animation
    this.status = createStatus()
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
      shape.moveBottom()
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
      shape.moveBottom()
    })
  }

  recover(flaggedYAxes) {
    const { shape, board, status } = this

    shape.reset()
    board.updateWithYAxes(flaggedYAxes)
    status.toggle()
  }

  update(delta) {
    const { status } = this

    if (status.isNormal()) {
      this.updateForNormal(delta)
    } else if (status.isAnimation()) {
      this.updateForAnimation(delta)
    } else if (status.isEnd()) {
      this.app.replaceScene(new EndScene(this.app))
    }
  }

  updateForNormal(delta) {
    const { board, shape, animation, status } = this

    if (board.isEnd()) {
      status.toEnd()
      return
    }

    if (
      shape.y + shape.height >= Config.CanvasHeight ||
      shape.isValidOfPreDown()
    ) {
      board.updateFlagWithPoints(shape.points)
      const flaggedYAxes = board.getFlaggedOfYAxes()
      if (flaggedYAxes.length) {
        const positionsList = flaggedYAxes.map((y) => {
          return board.flaggedOfMap.xAxes.map((x) => ({ x, y }))
        })
        board.updateFlag(positionsList, UN_FLAGGED)
        status.toggle()
        animation.start(positionsList, flaggedYAxes)
      } else {
        shape.reset()
      }
    } else {
      shape.update(delta)
    }
  }

  updateForAnimation(delta) {
    const { animation } = this

    animation.update(delta)
  }

  draw() {
    const { board, shape, app, animation, status } = this
    const { context } = app

    board.draw(context)
    if (status.isNormal()) {
      shape.draw(context)
    }
    animation.draw(context)

    drawBoard(context)
  }
}
