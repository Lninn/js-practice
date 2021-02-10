export const utils = {
  log: console.log.bind(console),
  e(s) {
    return document.querySelectorAll(s)
  },
  $(s) {
    return this.e(s)[0]
  },
  $s(s) {
    return this.e(s)
  },
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

export const createNumbers = (length, dir = true) =>
  Array.from({ length }).map((_, i) => {
    if (dir) {
      return i
    } else {
      return length - i - 1
    }
  })

export function create2DimList(width, height, value) {
  const list = []

  for (let i = 0; i < height; i++) {
    list[i] = []
    for (let j = 0; j < width; j++) {
      list[i][j] = value
    }
  }

  return list
}
