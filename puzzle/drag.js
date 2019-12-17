
const canvas = e('#container')
const ctx = canvas.getContext('2d')

// 拖动缩放功能
let isDrag = false
const mouseDownPos = { x: 0, y: 0 }
const mouseMovePos = { x: 0, y: 0 }

const testRect = {
  x: 100,
  y: 100,
  width: 300,
  height: 300
}

const objToArr = function(obj = {}) {
  const keys = Object.keys(obj)
  const list = []

  for (const key of keys) {
    list.push(obj[key])
  }

  return list
}

const param = objToArr(testRect)

ctx.strokeStyle = "#ddd"
ctx.strokeRect(...param)

const section = function(point, r) {
  const [left, top, width, height] = r
  
  if (point.x >= left && point.x <= left + width) {
    if (point.y >= top && point.y <= top + height) {
      return true
    }
  }
  
  return false
}

const p = 10
const pointInRect = function(point, rect) {
  let r1, r2, r3, r4

  const { x, y, width: w, height: h } = rect

  r1 = [
    x + p,
    y,
    w - 2 * p,
    p,
  ]

  r2 = [
    x + w - p,
    y +  p,
    p,
    h - 2 * p,
  ]

  r3 = [
    x + p,
    y + h - p,
    w - 2 * p,
    p,
  ]

  r4 = [
    x,
    y +  p,
    p,
    h - 2 * p,
  ]

  let r = null
  if (section(point, r1)) {
    r = r1
  } 

  if (section(point, r2)) {
    r = r2
    if (isDrag) {
      testRect.width = mouseMovePos.x
      r[0] = r[0] + testRect.width - p
    }
  }

  if (section(point, r3)) {
    r = r3
  }

  if (section(point, r4)) {
    r = r4
  }

  ctx.lineWidth = 1
  if (r) {
    ctx.clearRect(0, 0, 800, 500)
    ctx.strokeStyle = "#ddd"
    const p = objToArr(testRect)
    ctx.strokeRect(...p)

    ctx.strokeStyle = "blue"
    ctx.strokeRect(...r)
  } else {
  }
}

const handleAppMouseDown = function(e) {
  const { x, y } = gPosOfEvt(e)

  mouseDownPos.x = x
  mouseDownPos.y = y
  isDrag = true
}

const handleAppMouseUp = function(e) {
    isDrag = false
}

const handleAppMouseMove = function(e) {
  const { x, y } = gPosOfEvt(e)

  mouseMovePos.x = x
  mouseMovePos.y = y

  const point = { x, y }

  pointInRect(point, testRect)
}

canvas.addEventListener("mousedown", handleAppMouseDown)
canvas.addEventListener("mouseup", handleAppMouseUp)
canvas.addEventListener("mousemove", handleAppMouseMove)