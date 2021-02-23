import { createNumbers } from './utils'
import { isFlagged } from './constant'

export function createMap(width, height, flag) {
  const xAxes = createNumbers(width)
  const yAxes = createNumbers(height)

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

  function getContinuousLineOfIndex() {
    const result = []

    for (const y of yAxes) {
      let isPassed = false

      for (const x of xAxes) {
        if (!isFlagged(map[y][x])) {
          isPassed = false
          break
        } else {
          isPassed = true
        }
      }

      if (isPassed) {
        result.push(y)
      }
    }

    return result
  }

  return {
    xAxes,
    yAxes,

    getFlag,
    setFlag,
    getFlags,
    setFlags,
    hasFlag,

    getContinuousLineOfIndex,
  }
}
