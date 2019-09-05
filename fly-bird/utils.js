const currentDate = function() {
  const d = new Date()
  return `${d.toLocaleString()}:`
}

const log = console.log.bind(console, currentDate())

const e = sel => document.querySelector(sel)

const randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/*
  两个矩形相交的检测
*/
const intersect = function(a, b, appHeight) {
  const t = (x, x1, x2) => {
    return x >= x1 && x <= x2
  }

  if (t(a.x, b.x, b.x + b.width) || t(b.x, a.x, a.x + a.width)) {
    if (
      t(a.y, b.y, b.y + b.height) ||
      t(b.y, a.y, a.y + a.height)
      // t(a.y, b.y, appHeight - 120 + b.height2) ||
      // t(b.y, a.y, appHeight - 120 + a.height2)
    ) {
      return true
    }
  }

  return false
}
