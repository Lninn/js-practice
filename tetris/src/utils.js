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

export function getRandomBlock() {
  return BLOCK_LIST[getRandomInt(BLOCK_LIST.length)]
  // return BLOCK_LIST[0]
}

export function transposeBlock(block = []) {
  const numOfRow = block.length
  const numOfColumn = block[0].length

  const newBlock = []
  for (let i = 0; i < numOfColumn; i++) {
    newBlock[i] = []
    for (let j = numOfRow - 1; j >= 0; j--) {
      newBlock[i].push(block[j][i])
    }
  }

  return newBlock
}
