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

const UPDATE_FOR_NORMAL = 1
const UDPATE_FOR_ANIMATION = 2
const UPDATE_FOR_END = 3

export default class GameScene extends Scene {
  constructor(app) {
    super(app)

    this.init()
    this.setup()
    this.register()
  }

  init() {
    this.updatedStatus = UPDATE_FOR_NORMAL
  }

  setup() {
    const board = new Board(this)
    const shape = new Shape(board)
    const animation = new Animation(this)

    this.board = board
    this.shape = shape
    this.animation = animation
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
    const { shape, board } = this

    shape.reset()
    board.updateWithYAxes(flaggedYAxes)
    this.toggleStatus()
  }

  toggleStatus() {
    if (this.updatedStatus === UPDATE_FOR_NORMAL) {
      this.updatedStatus = UDPATE_FOR_ANIMATION
    } else if (this.updatedStatus === UDPATE_FOR_ANIMATION) {
      this.updatedStatus = UPDATE_FOR_NORMAL
    }
  }

  update(delta) {
    const { updatedStatus } = this

    if (updatedStatus === UPDATE_FOR_NORMAL) {
      this.updateForNormal(delta)
    } else if (updatedStatus === UDPATE_FOR_ANIMATION) {
      this.updateForAnimation(delta)
    }
  }

  updateForNormal(delta) {
    const { board, shape, animation } = this

    if (
      shape.y + shape.height >= Config.CanvasHeight ||
      board.isValidOfPreDown(shape.points)
    ) {
      board.updateFlagWithPoints(shape.points)
      const flaggedYAxes = board.getFlaggedOfYAxes()
      if (flaggedYAxes.length) {
        const positionsList = flaggedYAxes.map((y) => {
          return board.xAxes.map((x) => ({ x, y }))
        })
        positionsList.forEach((positions) => {
          board.updateFlag(positions, UN_FLAGGED)
        })
        this.updatedStatus = UDPATE_FOR_ANIMATION
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
    const { board, shape, app, animation } = this
    const { context } = app

    board.draw(context)
    if (this.updatedStatus === UPDATE_FOR_NORMAL) {
      shape.draw(context)
    }
    animation.draw(context)

    drawBoard(context)
  }
}
