const log = console.log.bind(console)

const debug = function(...args) {
  log("DEBUG# ", ...args)
}

const e = sel => document.querySelector(sel)

const sumOfList = function(list = []) {
  if (!Array.isArray(list)) {
    log("err: 参数必须是一个数组")
    return 0
  }

  if (!list.length) {
    return 0
  }

  return list.reduce(function(a, b) {
    return a + b
  }, 0)
}

/**
 * 计算矩形的中心点
 *
 * TODO 应该处理长方形的距离问题，通过一个 系数 控制计算的力度
 *
 * @param {block 元数据} param0
 */
const getCenterPoint = function({ start, end, width, height }) {
  h = start + width
  v = end + height

  return { x: h / 3, y: v / 2 }
}

const calcDistanceBetween2P = function(p1, p2) {
  const x2 = Math.pow(Math.abs(p1.x - p2.x), 2)
  const y2 = Math.pow(Math.abs(p1.y - p2.y), 2)

  return Math.sqrt(x2 + y2)
}

const getDistanceBetween2B = function(b1, b2) {
  const p1 = getCenterPoint(b1)
  const p2 = getCenterPoint(b2)

  return calcDistanceBetween2P(p1, p2)
}

const gPosOfEvt = function(e) {
  const { offsetX: x, offsetY: y } = e
  return { x, y }
}

const printSource = function(blocks) {
  const debugEl = e("#debug")
  const canvas = e("#container")
  const list = [...blocks].map(s => s.raw)
  const r = canvas.getBoundingClientRect()

  // let html = `
  //   <div class="canvas-data">
  //       <pre>
  //           ${JSON.stringify(r, null, 5)}
  //       </pre>
  //   </div>
  // `

  let html = ""

  for (const b of blocks) {
    const [x, y, w, h] = b.raw.slice(4)
    const t = `
    <div class="code-block">
        <pre>
            ${JSON.stringify({ idx: b.name, x, y, w, h }, null, 2)}
        </pre>
    </div>
        `
    html += t
  }

  debugEl.innerHTML = html
}

const printIndex = function(blocks) {
  const t = [...blocks].map(b => b.name)
  log(t)
}

const generatelist = function(start, end) {
  const list = []
  if (start > end) {
    return list
  }

  for (let i = start; i < end; i++) {
    list.push(i)
  }
  return list
}

const randomList = function(list = []) {
  if (!list.length) {
    return list
  }

  return list.sort(function(a, b) {
    return Math.random() < 0.5
  })
}

// http://stackoverflow.com/questions/962802#962890
const shuffle = function(array) {
  var tmp,
    current,
    top = array.length
  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1))
      tmp = array[current]
      array[current] = array[top]
      array[top] = tmp
    }
  return array
}
