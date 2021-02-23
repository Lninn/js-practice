import { createNumbers } from './utils'
import { isFlagged } from './constant'

export function createMap(width, height, flag) {
  const map = []

  for (let col = 0; col < height; col++) {
    map[col] = []
    for (let row = 0; row < width; row++) {
      map[col][row] = flag
    }
  }

  function hasFlag(positions = []) {
    const flags = getFlags(positions)

    return flags.some((flag) => isFlagged(flag))
  }

  function getFlags(positions = []) {
    return positions.map(getFlag)
  }

  function setFlags(positions = [], newFlag) {
    positions.forEach((position) => {
      setFlag(position, newFlag)
    })
  }

  function getFlag(position) {
    const { x, y } = position

    return map[y][x]
  }

  function setFlag(position, newFlag) {
    const { x, y } = position

    map[y][x] = newFlag
  }

  return {
    xAxes: createNumbers(width),
    yAxes: createNumbers(height),

    getFlag,
    setFlag,
    getFlags,
    setFlags,
    hasFlag,
  }
}
