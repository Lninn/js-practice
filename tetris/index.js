import {
  CONSTENT,
  KEY_CODES_ALPHABET,
  SHAPE_META,
  CONFIG,
  INTERVAL,
} from './constant'
import { utils, getRandomInt, transpose, getGraphPoints } from './utils'
import './index.css'

const canvas = utils.$('#canvas')
const context = canvas.getContext('2d')

const orinigalPoint = {
  x: INTERVAL * 4,
  y: INTERVAL * 0,
}

const currentBlock = createBlock()

__mian()

function __mian() {
  initialize()
  draw()
  update()
}

function initialize() {
  canvas.style.width = CONFIG.canvasWidth + 'px'
  canvas.style.height = CONFIG.canvasHeight + 'px'

  canvas.width = CONFIG.canvasWidth
  canvas.height = CONFIG.canvasHeight

  context.strokeStyle = CONSTENT.STROKE
  context.fillStyle = CONSTENT.FILL
  context.lineWidth = CONSTENT.LINE_WIDTH

  document.addEventListener('keydown', onKeyDown)
}

function draw() {
  context.clearRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight)

  drawBoard()

  currentBlock.draw(context)
}

function update() {
  setInterval(() => {
    if (check()) {
      currentBlock.reset()
    }

    currentBlock.update()

    draw()
  }, 1000)
}

function check() {
   const { shapeMeta } = currentBlock
   const height = shapeMeta.length

   return currentBlock.y + height + INTERVAL >= CONFIG.canvasHeight
}

function createBlock() {
  const o = {}

  o.reset = function() {
    o.y = orinigalPoint.y || 0
    o.x = orinigalPoint.x || 0

    o.shapeMeta = SHAPE_META[getRandomInt(SHAPE_META.length)]
    o.graphPoints = getGraphPoints(o.shapeMeta, o)
  }

  o.transpose = function() {
    o.shapeMeta = transpose(o.shapeMeta)
    o.graphPoints = getGraphPoints(o.shapeMeta, o)
  }

  o.update = function() {
    o.y = o.y + INTERVAL
    o.graphPoints = getGraphPoints(o.shapeMeta, o)
  }

  o.draw = function(context) {
    o.graphPoints.forEach((point) => {
      context.beginPath()
      context.rect(point.x, point.y, INTERVAL, INTERVAL)
      context.stroke()
      context.fill()
      context.closePath()
    })
  }

  o.reset()

  return o
}

function onKeyDown(e) {
  const keyCode = e.keyCode

  if (keyCode === KEY_CODES_ALPHABET.SPACE) {
    currentBlock.transpose()
    draw()
  }
}

function drawBoard() {
  let i = 0

  // draw vertical line
  for (; i <= CONFIG.canvasWidth; i += CONSTENT.SIDE_LENGTH) {
    context.moveTo(0.5 + i, 0)
    context.lineTo(0.5 + i, CONFIG.canvasHeight)
  }

  // draw horizontal line
  for (i = 0; i <= CONFIG.canvasHeight; i += CONSTENT.SIDE_LENGTH) {
    context.moveTo(0, 0.5 + i)
    context.lineTo(CONFIG.canvasWidth, 0.5 + i)
  }

  context.strokeStyle = CONSTENT.BOARD_STROKE_COLOR
  context.stroke()
}
