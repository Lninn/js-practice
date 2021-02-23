export function createStatus() {
  let value = 0

  function isNormal() {
    return value === 0
  }

  function isAnimation() {
    return value === 1
  }

  function isEnd() {
    return value === 2
  }

  function toEnd() {
    value = 2
  }

  function toggle() {
    if (value === 0) {
      value = 1
    } else if (value === 1) {
      value = 0
    }
  }

  return {
    isNormal,
    isAnimation,
    isEnd,
    toEnd,
    toggle,
  }
}
