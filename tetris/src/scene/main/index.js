import { KEY_CODES_ALPHABET, KEY_CODES_ARROW } from '../../constant'

import Board from './Board'
import Scene from '../Scene'
import EndScene from '../end'
import Animation from './Animaiton'
import { drawBoard } from '../../utils'

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

    this.status = GameScene.statusOfNormal
  }

  register(shape) {
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
    const { board } = this

    board.updateWithYAxes()
    this.status = GameScene.statusOfNormal
  }

  animationStart(positionsList) {
    const { animation } = this

    this.status = GameScene.statusOfClear
    animation.start(positionsList)
  }

  update(delta) {
    if (this.status === GameScene.statusOfNormal) {
      this.updateForNormal(delta)
    } else if (this.status === GameScene.statusOfClear) {
      this.updateForAnimation(delta)
    } else if (this.status === GameScene.statusOfEnd) {
      this.app.replaceScene(new EndScene(this.app))
    }
  }

  updateForNormal(delta) {
    const { board } = this

    if (board.isEnd()) {
      this.status = GameScene.statusOfEnd
    } else {
      board.update(delta)
    }
  }

  updateForAnimation(delta) {
    const { animation } = this

    animation.update(delta)
  }

  draw() {
    const { board, app, animation } = this
    const { context } = app

    board.draw(context)
    animation.draw(context)
    drawBoard(context)
  }
}

GameScene.statusOfNormal = 1
GameScene.statusOfClear = 2
GameScene.statusOfEnd = 3
