export const SIDE_OF_LENGTH = 30

export const ORIGINAL_POINT = {
  x: SIDE_OF_LENGTH * 4,
  y: SIDE_OF_LENGTH * 0,
}

export const FLAGGED = 1
export const UN_FLAGGED = 0

export const Config = {
  // unit for 1
  BoardWidth: 10,
  BoardHeight: 14,
  // unit for SIDE_OF_LENGTH
  CanvasWidth: 10 * SIDE_OF_LENGTH,
  CanvasHeight: 14 * SIDE_OF_LENGTH,

  fps: 1,
  shape: {
    fillStyle: '#FFD500',
    strokeStyle: '#0341AE',
  },
  board: {
    strokeStyle: '#72CB3B',
  },
}

export const KEY_CODES_ARROW = {
  SPACE: 32,
  TOP: 38,
  BOTTOM: 40,
  LEFT: 37,
  RIGHT: 39,
}

export const KEY_CODES_ALPHABET = {
  SPACE: 32,
  TOP: 87,
  BOTTOM: 83,
  LEFT: 65,
  RIGHT: 68,
}

export function isSpace(keyCode) {
  return (
    keyCode === KEY_CODES_ALPHABET.SPACE || keyCode === KEY_CODES_ARROW.SPACE
  )
}

export function isTop(keyCode) {
  return keyCode === KEY_CODES_ALPHABET.TOP || keyCode === KEY_CODES_ARROW.TOP
}

export function isBottom(keyCode) {
  return (
    keyCode === KEY_CODES_ALPHABET.BOTTOM || keyCode === KEY_CODES_ARROW.BOTTOM
  )
}

export function isLeft(keyCode) {
  return keyCode === KEY_CODES_ALPHABET.LEFT || keyCode === KEY_CODES_ARROW.LEFT
}

export function isRight(keyCode) {
  return (
    keyCode === KEY_CODES_ALPHABET.RIGHT || keyCode === KEY_CODES_ARROW.RIGHT
  )
}

export function isPaused(keyCode) {
  return keyCode === 80
}
