import { KEY_CODES_ALPHABET, KEY_CODES_ARROW, Config } from '../../constant'

import Board from './Board'
import Scene from '../Scene'
import EndScene from '../end'
import { drawBoard, drawRect } from '../../utils'

export default class GameScene extends Scene {
  constructor(app) {
    super(app)

    this.setup()
  }

  setup() {
    const board = new Board(this)

    this.board = board
    this.status = GameScene.statusOfNormal

    this.timer = performance.now()
    this.fps = 10
    this.reset()
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

  startToClear(positionsList = []) {
    const s = Config.sideOfLength

    const points = []
    for (const positions of positionsList) {
      for (const position of positions) {
        points.push({
          x: position.x * s,
          y: position.y * s,
        })
      }
    }

    this.points = points
    this.numOfStar = 10
  }

  recover() {
    const { board } = this

    board.updateWithYAxes()
    this.status = GameScene.statusOfNormal
  }

  reset() {
    this.numOfStar = -1
    this.points = []
  }

  animationStart(positionsList) {
    this.status = GameScene.statusOfClear
    this.startToClear(positionsList)
  }

  update(delta) {
    if (this.status === GameScene.statusOfNormal) {
      this.updateForNormal(delta)
    } else if (this.status === GameScene.statusOfClear) {
      this.updateOfClear(delta)
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

  updateOfClear(delta) {
    this.timer += delta

    if (this.timer >= 1000 / this.fps) {
      if (this.numOfStar < 0) {
        this.reset()
        this.recover()
      } else {
        this.numOfStar -= 1
      }
      this.timer = 0
    }
  }

  draw() {
    const { board, app } = this
    const { context } = app

    board.draw(context)

    if (this.numOfStar > 0 && this.numOfStar % 2 === 0) {
      for (const point of this.points) {
        drawRect(point, context, true)
      }
    }

    drawBoard(context)
  }
}

GameScene.statusOfNormal = 1
GameScene.statusOfClear = 2
GameScene.statusOfEnd = 3
