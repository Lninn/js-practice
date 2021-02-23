export const Transform = {
  up: 0,
  right: 1,
  bottom: 2,
  left: 3,
  transpose: 4,
}

export function transoform(positions, actionName) {
  switch (actionName) {
    case Transform.up:
      return updateVertical(positions, false)
    case Transform.right:
      return updateHorizontal(positions)
    case Transform.bottom:
      return updateVertical(positions)
    case Transform.left:
      return updateHorizontal(positions, false)
    case Transform.transpose:
      return positions
    default:
      throw new Error('无效的 action ' + actionName)
  }
}

function updateHorizontal(positions = [], isPotive = true) {
  return positions.map((pos) => {
    return {
      ...pos,
      x: pos.x + (isPotive ? 1 : -1),
    }
  })
}

function updateVertical(positions = [], isPotive = true) {
  return positions.map((pos) => {
    return {
      ...pos,
      y: pos.y + (isPotive ? 1 : -1),
    }
  })
}
