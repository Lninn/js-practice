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
import { utils } from './utils'
import './index.css'

const canvas = utils.$('#canvas')
const context = canvas.getContext('2d')

let paused = false
let timer = null

const currentBlock = new Block()
const { markMap, rows: markRows, cols: markCols } = createMarkMap()

export { markMap }

console.log(currentBlock)
console.log(markMap)

__mian()

function __mian() {
  setup()

  document.addEventListener('keydown', onKeyDown)

  loop()
}

function loop() {
  timer = setInterval(() => {
    context.clearRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight)

    update()

    draw()
  }, 500)
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

function update() {
  if (paused) return

  currentBlock.update()
}

function draw() {
  drawBoard()

  Object.keys(markMap).forEach((outer) => {
    let target = markMap[outer]
    Object.keys(target).forEach((inner) => {
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

function createMarkMap() {
  const { canvasWidth, canvasHeight } = CONFIG

  const markMap = {}
  const rows = []
  const cols = []

  for (let i = 0; i < canvasWidth; i += INTERVAL) {
    markMap[i] = {}
    cols.push(i)
    for (let j = 0; j < canvasHeight; j += INTERVAL) {
      rows.push(j)
      markMap[i][j] = { value: 0 }
    }
  }

  return { markMap, rows, cols }
}

function filterMarkMap(dataMap) {
  Object.keys(dataMap).forEach((outer) => {
    const target = dataMap[outer]
    Object.keys(target).forEach((inner) => {
      const { value } = target[inner]
      if (value === 1) {
        console.log({ x: outer, y: inner })
      }
    })
  })
}

function onKeyDown(e) {
  const keyCode = e.keyCode

  if (keyCode === 80) {
    paused = !paused
  }

  if (isSpace(keyCode)) {
    currentBlock.transpose()
    reDraw()
  } else if (isLeft(keyCode)) {
    currentBlock.moveLeft()
    reDraw()
  } else if (isRight(keyCode)) {
    currentBlock.moveRight()
    reDraw()
  }
}

function reDraw() {
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

  context.strokeStyle = CONSTENT.BOARD_STROKE_COLOR
  context.stroke()
}
