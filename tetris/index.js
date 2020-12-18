const UTILS = {
  log: console.log.bind(console),
  e(s) {
    return document.querySelectorAll(s);
  },
  $(s) {
    return this.e(s)[0];
  },
  $s(s) {
    return this.e(s);
  },
};

const CONSTENT = {
  STROKE: "#222222",
  FILL: "#2962ff",
  LINE_WIDTH: 1,
  SIDE_LENGTH: 10,
  STEP: 5,
};

const KEY_CODES = {
  SPACE: 32,
  TOP: 38,
  BOTTOM: 40,
  LEFT: 37,
  RIGHT: 39,
};

const canvas = UTILS.$("#canvas");
const context = canvas.getContext("2d");

canvas.width = 320;
canvas.height = 482;

context.scale(2, 2);

context.strokeStyle = CONSTENT.STROKE;
context.fillStyle = CONSTENT.FILL;
context.lineWidth = CONSTENT.LINE_WIDTH;

class Shape {
  constructor(options) {
    const { x, y, width, height } = options;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  static getHeight(shape) {}

  moveLeft() {
    this.x -= CONSTENT.SIDE_LENGTH;
  }

  moveRight() {
    this.x += CONSTENT.SIDE_LENGTH;
  }

  check() {
    return false;
  }

  update() {
    this.y += CONSTENT.SIDE_LENGTH;
  }
}

class IShape extends Shape {
  constructor(options) {
    super({
      ...options,
      width: CONSTENT.SIDE_LENGTH * 4,
      height: CONSTENT.SIDE_LENGTH * 1,
    });

    this.isHorizontal = true;
  }

  changeShape() {
    this.isHorizontal = !this.isHorizontal;
  }

  getHeight() {
    if (this.isHorizontal) {
      return this.height;
    } else {
      return this.width;
    }
  }

  render(ctx) {
    let { x, y, width, height, isHorizontal } = this;

    if (!this.isHorizontal && y > 200) {
      y = 200;
    }

    let i = 0;
    let c = CONSTENT.SIDE_LENGTH;
    for (; i < width; i += c) {
      ctx.beginPath();

      if (isHorizontal) {
        ctx.rect(x + i, y, c, c);
      } else {
        ctx.rect(x, y + i, c, c);
      }

      ctx.stroke();
      ctx.fill();
    }
  }
}

class SShape extends Shape {
  constructor(options) {
    super({
      ...options,
      width: CONSTENT.SIDE_LENGTH * 3,
      height: CONSTENT.SIDE_LENGTH * 2,
    });

    this.isTruned = false;
  }

  check(i, j) {
    let c = CONSTENT.SIDE_LENGTH;
    const { isTruned } = this;

    if (isTruned) {
      return (j === 0 && i === 0) || (j === c && i === 2 * c);
    } else {
      return (j === 0 && i === 0) || (j === c && i === 2 * c);
    }
  }

  getHeight() {
    if (this.isTruned) {
      return this.height;
    } else {
      return this.height + CONSTENT.SIDE_LENGTH;
    }
    return;
  }

  changeShape() {
    this.isTruned = !this.isTruned;
  }

  render(ctx) {
    const { x, y, width, height, isTruned } = this;

    let row = 0,
      column = 0;
    let c = CONSTENT.SIDE_LENGTH;

    if (isTruned) {
      for (; column < height; column += c) {
        for (row = 0; row < width; row += c) {
          if (this.check(row, column)) {
            continue;
          }

          ctx.beginPath();

          ctx.rect(x + row, y + column, c, c);

          ctx.stroke();
          ctx.fill();
        }
      }
    } else {
      for (; column < height + c; column += c) {
        for (row = 0; row < width - c; row += c) {
          if (row === 0 && column === 0) {
            continue;
          }
          if (column === c * 2 && row === c) {
            continue;
          }
          ctx.beginPath();

          ctx.rect(x + row, y + column, c, c);

          ctx.stroke();
          ctx.fill();
        }
      }
    }
  }
}

class ZShape extends Shape {
  constructor(options) {
    super({
      ...options,
      width: CONSTENT.SIDE_LENGTH * 3,
      height: CONSTENT.SIDE_LENGTH * 2,
    });

    this.isTruned = false;
  }

  check(i, j) {
    let c = CONSTENT.SIDE_LENGTH;
    const { isTruned } = this;

    if (isTruned) {
      return (j === 0 && i === 2 * c) || (j === c && i === 0);
    } else {
      return (j === 0 && i === 0) || (j === c && i === 2 * c);
    }
  }

  getHeight() {
    if (this.isTruned) {
      return this.height;
    } else {
      return this.height + CONSTENT.SIDE_LENGTH;
    }
    return;
  }

  changeShape() {
    this.isTruned = !this.isTruned;
  }

  render(ctx) {
    const { x, y, width, height, isTruned } = this;

    let row = 0,
      column = 0;
    let c = CONSTENT.SIDE_LENGTH;

    if (isTruned) {
      for (; column < height; column += c) {
        for (row = 0; row < width; row += c) {
          if (this.check(row, column)) {
            continue;
          }

          ctx.beginPath();

          ctx.rect(x + row, y + column, c, c);

          ctx.stroke();
          ctx.fill();
        }
      }
    } else {
      for (; column < height + c; column += c) {
        for (row = 0; row < width - c; row += c) {
          if (row === 0 && column === 0) {
            continue;
          }
          if (column === c * 2 && row === c) {
            continue;
          }
          ctx.beginPath();

          ctx.rect(x + row, y + column, c, c);

          ctx.stroke();
          ctx.fill();
        }
      }
    }
  }
}

class OShape extends Shape {
  constructor(options) {
    super({
      ...options,
      width: CONSTENT.SIDE_LENGTH * 2,
      height: CONSTENT.SIDE_LENGTH * 2,
    });
  }

  getHeight() {
    return this.height;
  }

  render(ctx) {
    const { x, y, width, height } = this;

    let row = 0,
      column = 0;
    let c = CONSTENT.SIDE_LENGTH;
    for (; column < height; column += c) {
      for (row = 0; row < width; row += c) {
        ctx.beginPath();

        ctx.rect(x + row, y + column, c, c);

        ctx.stroke();
        ctx.fill();
      }
    }
  }
}

// shapes i l j o z s t

const shapePool = [
  new SShape({
    x: 60,
    y: 0,
  }),
  // new ZShape({
  //   x: 60,
  //   y: 0
  // }),
  // new IShape({
  //   x: 90,
  //   y: 0
  // })
];

let currentIndex = 0;
let currentShape = shapePool[currentIndex];

let paused = false;

function onKeyDown(e) {
  const keyCode = e.keyCode;

  if (paused) {
    return;
  }

  if (keyCode === KEY_CODES.SPACE) {
    currentShape.changeShape && currentShape.changeShape();
  }

  if (keyCode === KEY_CODES.LEFT) {
    currentShape.moveLeft();
  }

  if (keyCode === KEY_CODES.RIGHT) {
    currentShape.moveRight();
  }
}

// Box width
var bw = 300;
// Box height
var bh = 450;
// Padding
var p = 0;

function drawBoard() {
  for (var x = 0; x <= 300; x += CONSTENT.SIDE_LENGTH) {
    context.moveTo(0.5 + x + p, p);
    context.lineTo(0.5 + x + p, bh + p);
  }

  for (var x = 0; x <= 450; x += CONSTENT.SIDE_LENGTH) {
    context.moveTo(p, 0.5 + x + p);
    context.lineTo(bw + p, 0.5 + x + p);
  }
  context.strokeStyle = "black";
  context.stroke();
}

function isEnd(shape) {
  const { y } = shape;
  const h = shape.getHeight();

  return y + h >= 240;
}

function run() {
  if (paused) {
    return;
  }

  context.clearRect(0, 0, 300, 450);

  // drawBoard();

  if (isEnd(currentShape)) {
    // paused = true;
    // console.log("end");
    //     currentIndex = (currentIndex + 1) % shapePool.length;
    //     currentShape.y = 0;
    //     currentShape = shapePool[currentIndex];
  }

  currentShape.render(context);
}

let req;

function start() {
  req = requestAnimationFrame(start);
  run();
}

export function main() {
  document.addEventListener("keydown", onKeyDown);

  setInterval(function () {
    if (paused) {
      return;
    }

    if (isEnd(currentShape)) {
      paused = true;
      return;
    }

    currentShape.update();
  }, 300);

  try {
    start();
  } catch (e) {
    cancelAnimationFrame(req);
    console.error("RUNTIME ", e);
  }
}

UTILS.log(canvas);

function reset() {
  paused = false;
  currentShape.y = 0;
}

main();
