import { CONSTENT, KEY_CODES } from './constant'
import { UTILS, getRandomInt, swap } from './utils'
import config from './config'
import './index.css'

const canvas = UTILS.$('#canvas')
const context = canvas.getContext('2d')

const shapeMeta = [
  // I
  [[1, 1, 1, 1]],
  // O
  [
    [1, 1],
    [1, 1],
  ],
  // T
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  // L
  [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  // J
  [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  // Z
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  // S
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
]

let lastShape = shapeMeta[0]

const interval = 30

const orinigalPoint = {
  x: interval * 3,
  y: interval * 3,
}

let graphPoints = getGraphPoints(lastShape)

function changeShape() {
  lastShape = swap(lastShape)
  graphPoints = getGraphPoints(lastShape)
  draw()
}

function draw() {
  context.clearRect(0, 0, config.canvasWidth, config.canvasHeight)

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
  canvas.style.width = config.canvasWidth + 'px'
  canvas.style.height = config.canvasHeight + 'px'

  canvas.width = config.canvasWidth
  canvas.height = config.canvasHeight

  context.strokeStyle = CONSTENT.STROKE
  context.fillStyle = CONSTENT.FILL
  context.lineWidth = CONSTENT.LINE_WIDTH

  document.addEventListener('keydown', onKeyDown)
}

function onKeyDown(e) {
  const keyCode = e.keyCode

  if (keyCode === KEY_CODES.SPACE) {
    return changeShape()
  }
}

function drawBoard() {
  let i = 0

  // draw vertical line
  for (; i <= config.canvasWidth; i += CONSTENT.SIDE_LENGTH) {
    context.moveTo(0.5 + i, 0)
    context.lineTo(0.5 + i, config.canvasHeight)
  }

  // draw horizontal line
  for (i = 0; i <= config.canvasHeight; i += CONSTENT.SIDE_LENGTH) {
    context.moveTo(0, 0.5 + i)
    context.lineTo(config.canvasWidth, 0.5 + i)
  }

  context.strokeStyle = CONSTENT.BOARD_STROKE_COLOR
  context.stroke()
}

initialize()

draw()

setInterval(() => {
  const height = lastShape.length

  if (orinigalPoint.y + height + interval >= config.canvasWidth) {
    orinigalPoint.y = 0
    lastShape = shapeMeta[getRandomInt(shapeMeta.length)]
  }

  orinigalPoint.y = orinigalPoint.y + interval

  graphPoints = getGraphPoints(lastShape)
  draw()
}, 1000)
