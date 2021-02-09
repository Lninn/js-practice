import { getRandomInt } from './utils'
import { SIDE_OF_LENGTH } from './constant'

const BLOCK_LIST = [
  // I
  [[1, 1, 1, 1]],
  // O
  [
    [1, 1],
    [1, 1],
  ],
  // T
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  // L
  [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  // J
  [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  // Z
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  // S
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
]

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

export function getSize(block) {
  const width = block[0].length * SIDE_OF_LENGTH
  const height = block.length * SIDE_OF_LENGTH

  return { width, height }
}
