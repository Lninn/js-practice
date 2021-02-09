import { BLOCK_LIST } from './constant'

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
