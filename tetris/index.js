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
let timer = null

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
  
  draw()
  update()

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
  context.clearRect(0, 0, CONFIG.canvasWidth + 1, CONFIG.canvasHeight + 1)

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
  timer = setInterval(() => {
    const { shapeMeta, graphPoints, y } = currentBlock

    if (check(shapeMeta, y)) {
      graphPoints.forEach(point => {
        markMap[point.x][point.y].value = 1
      })

      currentBlock.reset()
    }

    currentBlock.update()

    draw()
  }, 100)
}

function check(shapeMeta, y) {
   const height = shapeMeta.length * INTERVAL

   return y + height + INTERVAL >= CONFIG.canvasHeight
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

  o.moveLeft = function() {
    const { canvasWidth } = CONFIG
    var accu = o.x - INTERVAL
    
    if (o.x === 0) {
      accu = 0
    } else if (o.x === canvasWidth - 1) {
      accu = canvasWidth - 1
    }

    o.x = accu
  }

  o.moveRight = function() {
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
    draw()
  } else if (isLeft(keyCode)) {
    currentBlock.moveLeft()
  } else if (isRight(keyCode)) {
    currentBlock.moveRight()
  }
}

function drawBoard() {
  let i = 0
  const w = CONFIG.canvasWidth
  const h = CONFIG.canvasHeight

  // draw vertical line
  for (; i <= w; i += INTERVAL) {
    context.moveTo(0.5 + i, 0)
    context.lineTo(0.5 + i, h)
  }

  // draw horizontal line
  for (i = 0; i <= h; i += INTERVAL) {
    context.moveTo(0, 0.5 + i)
    context.lineTo(w, 0.5 + i)
  }

  context.strokeStyle = CONSTENT.BOARD_STROKE_COLOR
  context.stroke()
}
