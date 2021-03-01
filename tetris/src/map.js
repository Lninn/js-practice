import { createNumbers } from './utils'
import { isFlagged, UN_FLAGGED, FLAGGED, Config } from './constant'

export function createMap(width, height, flag) {
  const xAxes = createNumbers(width)
  const yAxes = createNumbers(height)

  const map = []
  let fullLines = []

  const addFullLines = (lines) => {
    fullLines = lines
  }

  const clearFullLines = () => {
    fullLines = []
  }

  const isNormal = () => !fullLines.length

  const updateWithYAxes = () => {
    let positions = getValidPositios(fullLines)

    fullLines.forEach((_) => {
      setFlags(positions, UN_FLAGGED)
      positions = positions.map((position) => {
        if (position.y === Config.BoardHeight - 1) {
          return position
        }

        return {
          ...position,
          y: position.y + 1,
        }
      })

      setFlags(positions, FLAGGED)
    })

    clearFullLines()
  }

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

  const check = () => {
    const lines = getContinuousLineOfIndex()
    if (!lines.length) {
      return false
    }

    addFullLines(lines)

    const positionsList = lines.map((y) => {
      return xAxes.map((x) => ({ x, y }))
    })

    positionsList.forEach((positions) => {
      setFlags(positions, UN_FLAGGED)
    })

    return positionsList
  }

  function getValidPositios(indexs) {
    const positions = []
    const minYIndex = Math.min(...indexs)

    for (const y of yAxes) {
      for (const x of xAxes) {
        if (isFlagged(map[y][x]) && y <= minYIndex) {
          positions.push({ x, y })
        }
      }
    }

    return positions
  }

  const isEnd = () => {
    const topIndex = yAxes[0]
    const positions = xAxes.map((x) => ({ x, y: topIndex }))

    return hasFlag(positions)
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
    getValidPositios,

    isEnd,
    isNormal,
    check,
    updateWithYAxes,
  }
}
