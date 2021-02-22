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

const UPDATE_FOR_NORMAL = 1
const UDPATE_FOR_ANIMATION = 2
const UPDATE_FOR_END = 3

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

    this.timer = performance.now()

    this.updatedStatus = UPDATE_FOR_NORMAL
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
      shape.update()
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
      shape.update()
    })
  }

  update(delta) {
    const { updatedStatus } = this

    this.timer += delta

    if (updatedStatus === UPDATE_FOR_NORMAL) {
      if (this.timer >= 1000 / 1) {
        this.updateForNormal(delta)
        this.timer = 0
      }
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
        animation.open(positionsList)
      } else {
        shape.reset()
      }
    } else {
      shape.update()
    }
  }

  updateForAnimation(delta) {
    const { animation } = this

    animation.update(delta)
  }

  _update(delta) {
    const { board, app, animation } = this

    if (board.isEnd()) {
      app.replaceScene(new EndScene(app))
      return
    }

    this.timer += delta

    if (this.timer >= 1000 / this.fps) {
      const { board, shape, animation } = this

      if (animation.isAnimation()) {
        return
      }

      if (
        shape.y + shape.height >= Config.CanvasHeight ||
        board.isValidOfPreDown(shape.points)
      ) {
        board.updateFlagWithPoints(shape.points)

        const flaggedYAxes = board.getFlaggedOfYAxes()
        if (flaggedYAxes.length) {
          animation.open(flaggedYAxes)
        } else {
          shape.reset()
        }
      } else {
        shape.update()
      }

      this.timer = 0
    }

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

export function drawBoard(context) {
  const w = Config.CanvasWidth
  const h = Config.CanvasHeight
  const step = Config.sideOfLength - 0.1

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
