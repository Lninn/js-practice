import {
  CONSTENT,
  SHAPE_META,
  CONFIG,
  INTERVAL,
  isSpace,
  isLeft,
  isRight,
} from './constant'
import { utils, getRandomInt, transpose, getGraphPoints } from './utils'
import './index.css'

const canvas = utils.$('#canvas')
const context = canvas.getContext('2d')

let fpsInterval = 1000 / 5, now = performance.now(), then = performance.now(), elapsed

const orinigalPoint = {
  x: INTERVAL * 4,
  y: INTERVAL * 0,
}

const currentBlock = createBlock()
const markMap = createMarkMap()

__mian()

function __mian() {
  setup()

  document.addEventListener('keydown', onKeyDown)
  
  loop()
}

function loop() {
  now = performance.now()
  elapsed = now - then

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval)

    context.clearRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight)
    
    update()
    draw()
  }

  requestAnimationFrame(loop)
}

function setup() {
  canvas.style.width = CONFIG.canvasWidth + 'px'
  canvas.style.height = CONFIG.canvasHeight + 'px'

  canvas.width = CONFIG.canvasWidth
  canvas.height = CONFIG.canvasHeight

  context.strokeStyle = CONSTENT.STROKE
  context.fillStyle = CONSTENT.FILL
  context.lineWidth = CONSTENT.LINE_WIDTH
}

function draw() {

  drawBoard()

  Object.keys(markMap).forEach(outer => {
    let target = markMap[outer]
    Object.keys(target).forEach(inner => {
      const { value } = target[inner]

      if (value === 1) {
        context.beginPath()
        context.rect(outer, inner, INTERVAL, INTERVAL)
        context.stroke()
        context.fill()
        context.closePath()
      }

    })
  })

  currentBlock.draw(context)
}

function update() {
  const { graphPoints, y } = currentBlock

  if (check()) {
    graphPoints.forEach(point => {
      markMap[point.x][point.y].value = 1
    })

    currentBlock.reset()
  }

  currentBlock.update()
}

function check() {
   return currentBlock.y + currentBlock.h >= CONFIG.canvasHeight
}

function createMarkMap() {
  const { canvasWidth, canvasHeight } = CONFIG

  const markMap = {}
  for (let i = 0; i < canvasWidth; i += INTERVAL) {
    markMap[i] = {}
    for (let j = 0; j < canvasHeight; j += INTERVAL) {
      markMap[i][j] = { value: 0 }
    }
  }

  return markMap
}

function createBlock() {
  const o = {}

  o.reset = function() {
    o.y = orinigalPoint.y || 0
    o.x = orinigalPoint.x || 0

    var shape = SHAPE_META[getRandomInt(SHAPE_META.length)]

    o.w = shape[0].length * INTERVAL
    o.h = shape.length * INTERVAL

    o.shapeMeta = shape
    o.graphPoints = getGraphPoints(o.shapeMeta, o)
  }

  o.transpose = function() {
    const { canvasWidth, canvasHeight } = CONFIG
    
    const shape = transpose(o.shapeMeta)

    const w = shape[0].length * INTERVAL
    const h = shape.length * INTERVAL

    if (o.x + w > canvasWidth) {
      return
    }

    if (o.y + h > canvasHeight) {
      return
    }

    o.w = w
    o.h = h
    o.shapeMeta = shape
    o.graphPoints = getGraphPoints(o.shapeMeta, o)
  }

  o.moveLeft = function() {
    if (o.x <= 0) {
      return
    } 

    o.x = o.x - INTERVAL
  }

  o.moveRight = function() {
    const { canvasWidth } = CONFIG

    if (o.x + o.w >= canvasWidth) {
      return
    }

    o.x = o.x + INTERVAL
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

  if (isSpace(keyCode)) {
    currentBlock.transpose()
  } else if (isLeft(keyCode)) {
    currentBlock.moveLeft()
  } else if (isRight(keyCode)) {
    currentBlock.moveRight()
  }
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

  context.strokeStyle = CONSTENT.BOARD_STROKE_COLOR
  context.stroke()
}
