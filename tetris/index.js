import {
  CONSTENT,
  SHAPE_META,
  CONFIG,
  INTERVAL,
  isSpace,
  isLeft,
  isRight,
} from './constant'
import Block from './block'
import { utils, getRandomInt, transpose, getGraphPoints } from './utils'
import './index.css'

const canvas = utils.$('#canvas')
const context = canvas.getContext('2d')

let fpsInterval = 1000 / 5, now = performance.now(), then = performance.now(), elapsed

const orinigalPoint = {
  x: INTERVAL * 4,
  y: INTERVAL * 0,
}

const currentBlock = new Block()
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
  const { pointList, y } = currentBlock

  if (check()) {
    pointList.forEach(point => {
      markMap[point.x][point.y].value = 1
    })

    currentBlock.reset()
  }

  currentBlock.update()
}

function check() {
   return currentBlock.y + currentBlock.height >= CONFIG.canvasHeight
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
