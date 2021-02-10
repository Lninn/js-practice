import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  SIDE_OF_LENGTH,
  Config,
  isSpace,
  isLeft,
  isRight,
  isBottom,
  isTop,
  isPaused,
} from './constant'
import Shape from './Shape'
import Board from './Board'
import { utils } from './utils'
import '../index.css'

const canvas = utils.$('#canvas')
const context = canvas.getContext('2d')

let paused = false

let now,
  then,
  delta,
  fps = 1,
  interval = 1000 / fps

const currentShape = Shape.getInstance()
const board = Board.getInstance()

__mian()

function loop(timestamp) {
  if (then === undefined) {
    then = timestamp
  }

  now = timestamp
  delta = now - then
  if (delta > interval) {
    console.log('update')

    update()

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    draw()

    then = now - (delta % interval)
  }

  requestAnimationFrame(loop)
}

function __mian() {
  setup()

  loop()
  draw()
}

function setup() {
  canvas.style.width = CANVAS_WIDTH + 'px'
  canvas.style.height = CANVAS_HEIGHT + 'px'

  canvas.width = CANVAS_WIDTH
  canvas.height = CANVAS_HEIGHT

  context.lineWidth = 1
  context.fillStyle = '#FFD500'

  document.addEventListener('keydown', onKeyDown)
}

function update() {
  if (paused) return

  currentShape.update()
}

function draw() {
  board.draw(context)

  currentShape.draw(context)

  drawBoard()
}

function onKeyDown(e) {
  const keyCode = e.keyCode
  let isUpdated = true

  if (isPaused(keyCode)) {
    paused = !paused
    isUpdated = false
  } else if (isSpace(keyCode)) {
    currentShape.transpose()
  } else if (isLeft(keyCode)) {
    currentShape.moveLeft()
  } else if (isRight(keyCode)) {
    currentShape.moveRight()
  } else if (isBottom(keyCode)) {
    currentShape.update()
  } else if (isTop(keyCode)) {
    currentShape.moveUp()
  } else {
    isUpdated = false
  }

  if (isUpdated) {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    draw()
  }
}

function drawBoard() {
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
