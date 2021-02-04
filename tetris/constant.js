export const CONSTENT = {
  STROKE: '#222222',
  FILL: '#2962ff',
  BOARD_STROKE_COLOR: '#f2f2f2',
  LINE_WIDTH: 1,
  SIDE_LENGTH: 30,
  STEP: 5,
}

export const INTERVAL = 30

export const CONFIG = {
  canvasRows: 420 / 30,
  canvasColumns: 600 / 30,
  canvasWidth: 420 + 1,
  canvasHeight: 600 + 1,
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
  return keyCode === KEY_CODES_ALPHABET.SPACE || keyCode === KEY_CODES_ARROW.SPACE
}

export function isTop(keyCode) {
  return keyCode === KEY_CODES_ALPHABET.TOP || keyCode === KEY_CODES_ARROW.TOP
}

export function isBottom(keyCode) {
  return keyCode === KEY_CODES_ALPHABET.BOTTOM || keyCode === KEY_CODES_ARROW.BOTTOM
}

export function isLeft(keyCode) {
  return keyCode === KEY_CODES_ALPHABET.LEFT || keyCode === KEY_CODES_ARROW.LEFT
}

export function isRight(keyCode) {
  return keyCode === KEY_CODES_ALPHABET.RIGHT || keyCode === KEY_CODES_ARROW.RIGHT
}

export const SHAPE_META = [
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
