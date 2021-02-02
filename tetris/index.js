import { CONSTENT, KEY_CODES_ALPHABET, SHAPE_META, CONFIG } from './constant'
import { UTILS, getRandomInt, swap } from './utils'
import './index.css'

const canvas = UTILS.$('#canvas')
const context = canvas.getContext('2d')

const interval = 30
const currentBlock = {
  shape: SHAPE_META[0],
}
const orinigalPoint = {
  x: interval * 3,
  y: interval * 3,
}

let graphPoints = getGraphPoints(currentBlock.shape)

function changeShape() {
  currentBlock.shape = swap(currentBlock.shape)
  graphPoints = getGraphPoints(currentBlock.shape)
  draw()
}

function draw() {
  context.clearRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight)

  drawBoard()

  graphPoints.forEach((point) => {
    context.beginPath()
    context.rect(point.x, point.y, interval, interval)
    context.stroke()
    context.fill()
    context.closePath()
  })
}

function getGraphPoints(elements = [], origin = orinigalPoint) {
  // console.log('[getGraphPoints] ', elements)
  const indexPoints = []

  elements.forEach((outerElement, outerIndex) => {
    outerElement.forEach((innerElement, innerIndex) => {
      innerElement === 1 && indexPoints.push({ x: innerIndex, y: outerIndex })
    })
  })

  return indexPoints.map((point) => {
    const x = origin.x + interval * point.x
    const y = origin.y + interval * point.y

    return { x, y }
  })
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

function onKeyDown(e) {
  const keyCode = e.keyCode

  if (keyCode === KEY_CODES_ALPHABET.SPACE) {
    return changeShape()
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

initialize()

draw()

setInterval(() => {
  const height = currentBlock.shape.length

  if (orinigalPoint.y + height + interval >= CONFIG.canvasWidth) {
    orinigalPoint.y = 0
    currentBlock.shape = SHAPE_META[getRandomInt(SHAPE_META.length)]
  }

  orinigalPoint.y = orinigalPoint.y + interval

  graphPoints = getGraphPoints(currentBlock.shape)
  draw()
}, 1000)
