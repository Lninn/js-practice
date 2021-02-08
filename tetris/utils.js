import { INTERVAL, BLOCK_LIST } from './constant'

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

export function get2DimMark(numOfRow, numOfCol) {
  const ret = []

  for (let i = 0; i < numOfRow; i++) {
    ret[i] = []
    for (let j = 0; j < numOfCol; j++) {
      ret[i][j] = 0
    }
  }

  return ret
}

export function getShapeSpace(shape) {
  let list = [createNumbers(5), createNumbers(5, false)]
  const ret = []
  const END_STATUS = 3

  function getIndex(status, row, col) {
    if (status % 2 === 0) {
      return [row, col]
    } else {
      return [col, row]
    }
  }

  function start(status) {
    let i = 0,
      j = 0

    if (status === 1 || status === 2) {
      i = 1
    }

    let rows = list[i],
      cols = list[j]

    let pass = true,
      count = 0
    for (const row of rows) {
      if (!pass) {
        break
      }

      for (const col of cols) {
        ;[i, j] = getIndex(status, row, col)

        if (shape[i][j] === 1) {
          pass = false
          break
        }
      }

      pass && count++
    }

    ret[status] = count

    if (status === END_STATUS) {
      return ret
    } else {
      return start(status + 1)
    }
  }

  return start(0)
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
  // return BLOCK_LIST[getRandomInt(BLOCK_LIST.length)]
  return BLOCK_LIST[0]
}

export const getBotomPoints = createGetPoints('x', (p1, p2) => p1.y > p2.y)

export const getLeftPoints = createGetPoints('y', (p1, p2) => p1.x < p2.x)

export const getRightPoints = createGetPoints('y', (p1, p2) => p1.x > p2.x)

function createGetPoints(keyOfAxis, compare) {
  return function getPoints(points = []) {
    const pointsObj = points.reduce((collect, nextpoint) => {
      const axisValue = nextpoint[keyOfAxis]
      const target = collect[axisValue]

      if (target === undefined) {
        collect[axisValue] = nextpoint
      } else {
        collect[axisValue] = compare(target, nextpoint) ? target : nextpoint
      }

      return collect
    }, {})

    return Object.entries(pointsObj).map(([_, point]) => point)
  }
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
