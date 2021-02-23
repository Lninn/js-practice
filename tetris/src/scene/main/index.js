import {
  KEY_CODES_ALPHABET,
  KEY_CODES_ARROW,
  Config,
  UN_FLAGGED,
} from '../../constant'

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
  }

  setup() {
    const board = new Board(this)
    const animation = new Animation(this)

    this.board = board
    this.animation = animation
    this.status = createStatus()
  }

  register(shape) {
    console.log('register', shape)
    const { app } = this

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

  recover() {
    const { board, status } = this

    board.updateWithYAxes()
    status.toggle()
  }

  animationStart(positionsList, indexs) {
    const { status, animation } = this

    status.toggle()
    animation.start(positionsList, indexs)
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
    const { board, status } = this

    if (board.isEnd()) {
      status.toEnd()
    } else {
      board.update(delta)
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

    animation.draw(context)

    drawBoard(context)
  }
}
