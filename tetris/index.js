import {
  CONFIG,
  INTERVAL,
  isSpace,
  isLeft,
  isRight,
  isBottom,
  isTop,
} from './constant'
import Block from './block'
import MarkMap from './MarkMap'
import { utils } from './utils'
import './index.css'

const canvas = utils.$('#canvas')
const context = canvas.getContext('2d')

let paused = false
let timer = null

const currentBlock = new Block()
const markMap = MarkMap.getInstance()

__mian()

function __mian() {
  setup()

  document.addEventListener('keydown', onKeyDown)

  loop()
  draw()
}

function loop() {
  timer = setInterval(() => {
    context.clearRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight)

    update()

    draw()
  }, 600)
}

function setup() {
  canvas.style.width = CONFIG.canvasWidth + 'px'
  canvas.style.height = CONFIG.canvasHeight + 'px'

  canvas.width = CONFIG.canvasWidth
  canvas.height = CONFIG.canvasHeight

  context.lineWidth = 1
  context.fillStyle = '#FFD500'
}

function update() {
  if (paused) return

  currentBlock.update()
}

function draw() {
  markMap.drawPoints.forEach((point) => {
    context.beginPath()
    context.rect(point.x, point.y, INTERVAL, INTERVAL)

    var strokeStyle = context.strokeStyle
    context.strokeStyle = '#0095DD'
    context.strokeStyle = strokeStyle

    context.stroke()
    context.fill()
    context.closePath()
  })

  currentBlock.draw(context)

  drawBoard()
}

function onKeyDown(e) {
  const keyCode = e.keyCode

  if (keyCode === 80) {
    paused = !paused
  }

  if (isSpace(keyCode)) {
    currentBlock.transpose()
  } else if (isLeft(keyCode)) {
    currentBlock.moveLeft()
  } else if (isRight(keyCode)) {
    currentBlock.moveRight()
  } else if (isBottom(keyCode)) {
    currentBlock.update()
  } else if (isTop(keyCode)) {
    currentBlock.moveUp()
  }

  context.clearRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight)

  draw()
}

function drawBoard() {
  const w = CONFIG.canvasWidth
  const h = CONFIG.canvasHeight
  const step = INTERVAL - 0.1

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
  context.strokeStyle = '#72CB3B'
  context.stroke()

  context.strokeStyle = strokeStyle
}
