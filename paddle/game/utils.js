const log = console.log.bind(console)

const e = sel => document.querySelector(sel)

const imageFromPath = function(path) {
  const img = new Image()
  img.src = path

  return img
}

// const intersect = function(a, b) {
//   const x1 = a.x + a.w
//   const x2 = b.x + b.w
//   const y1 = a.y + a.h
//   const y2 = b.y + b.h

//   const maxX = x1 >= x2 ? x1 : x2
//   const maxY = y1 >= y2 ? y1 : y2
//   const minX = a.x <= b.x ? a.x : b.x
//   const minY = a.y <= b.y ? a.y : b.y

//   const width = maxX - minX <= a.w + b.w
//   const height = maxY - minY <= a.h + b.h

//   return width && height 
// }

const intersect = function(a, b) {
  const t = (x, x1, x2) => {
    return x >= x1 && x <= x2
  }

  if (t(a.x, b.x, b.x + b.w) || t(b.x, a.x, a.x + a.w)) {
    if (t(a.y, b.y, b.y + b.h) || t(b.y, a.y, a.y + a.h)) {
      return true
    }
  }

  return false
}

const overlap = function(a, b) {
  const x1 = a.x + a.w
  const x2 = b.x + b.w
  const y1 = a.y + a.h
  const y2 = b.y + b.h

  const o = {
    x: null,
    y: null,
  }

  if (x1 > x2) {
    o.x = x2 - a.x
  } else {
    o.x = x1 - b.x
  }

  if (y1 > y2) {
    o.y = y2 - a.y
  } else {
    o.y = y1 - b.y
  }

  return o
}

const hasPoint = (rect, point) => {
  if (point.x >= rect.x && point.x <= rect.x + rect.w) {
    if (point.y >= rect.y && point.y <= rect.y + rect.h) {
      return true
    }
  }
  
  return false
}

const bindEvent = function(target, eventName, callback) {
  target.addEventListener(eventName, function(event) {
    callback(event)
  })
}

const getDataFromLS = function(name) {
  try {
    return JSON.parse(localStorage.getItem(name))
  } catch (error) {
    log('getDataFromLS error')
    return null
  }
}

const setDataToLS = function(name, data) {
  try {
    localStorage.setItem(name, JSON.stringify(data))
  } catch (error) {
    log('setDataToLS error')
  }
}

const isMobile = function() {
  const re = /Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i
  return re.test(navigator.userAgent)
}