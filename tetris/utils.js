export const UTILS = {
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

export function swap(elements = []) {
  const numOfRow = elements.length
  const numOfColumn = elements[0].length

  const newElements = []
  for (let i = 0; i < numOfColumn; i++) {
    newElements[i] = []
    for (let j = numOfRow - 1; j >= 0; j--) {
      newElements[i].push(elements[j][i])
    }
  }

  return newElements
}
