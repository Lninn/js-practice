import Shape from "./shape";
import { CONSTENT } from "../constant";
import { UTILS } from "../utils";

function isBrick(v) {
  return v === "1";
}

let i = `
00000
00100
11100
00000
00000
S
00100
00100
00110
00000
00000
S
00000
00000
00111
00100
00000
S
00000
00000
01100
00100
00100
`;

i = i.split("S").reduce((a, n, i) => {
  a[i] = n
    .split("\n")
    .filter((x) => x)
    .map((x) => x.split(""));
  return a;
}, {});

let createNumbers = (length, dir = true) =>
  Array.from({ length }).map((_, i) => {
    if (dir) {
      return i;
    } else {
      return length - i - 1;
    }
  });

function getShapeSpace(shape) {
  let list = [createNumbers(5), createNumbers(5, false)];
  const ret = [];
  const END_STATUS = 3;

  function getIndex(status, row, col) {
    if (status % 2 === 0) {
      return [row, col];
    } else {
      return [col, row];
    }
  }

  function start(status) {
    let i = 0,
      j = 0;

    if (status === 1 || status === 2) {
      i = 1;
    }

    let rows = list[i],
      cols = list[j];

    let pass = true,
      count = 0;
    for (const row of rows) {
      if (!pass) {
        break;
      }

      for (const col of cols) {
        [i, j] = getIndex(status, row, col);

        if (shape[i][j] === "1") {
          pass = false;
          break;
        }
      }

      pass && count++;
    }

    ret[status] = count;

    if (status === END_STATUS) {
      return ret;
    } else {
      return start(status + 1);
    }
  }

  return start(0);
}

class IShape extends Shape {
  constructor(options) {
    super({
      ...options,
      width: CONSTENT.SIDE_LENGTH * 4,
      height: CONSTENT.SIDE_LENGTH * 1,
    });

    this.shapeStatus = 0;

    this.width = 5 * CONSTENT.SIDE_LENGTH;
    this.height = 5 * CONSTENT.SIDE_LENGTH;

    this.shape = i[this.shapeStatus];

    this.shapeSpace = getShapeSpace(this.shape);
  }

  moveLeft() {
    if (this.x <= 0) {
      return;
    }

    this.x -= CONSTENT.SIDE_LENGTH;
  }

  changeShape() {
    this.shapeStatus = (this.shapeStatus + 1) % 4;

    this.shape = i[this.shapeStatus];
    this.shapeSpace = getShapeSpace(this.shape);
  }

  getHeight() {
    return this.height;
  }

  render(ctx) {
    let { x, y, width, height } = this;
    let C = CONSTENT.SIDE_LENGTH;

    let r = 0,
      c = 0,
      t;
    for (; r < 5; r++) {
      for (c = 0; c < 5; c++) {
        t = this.shape[r][c];

        if (isBrick(t)) {
          ctx.beginPath();
          ctx.rect(x + c * C, y + r * C, C, C);
          ctx.stroke();
          ctx.fill();
          ctx.closePath();
        }
      }
    }

    ctx.save();

    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.rect(x, y, C * 5, C * 5);
    ctx.stroke();

    ctx.restore();

    // let i = 0;
    // let c = CONSTENT.SIDE_LENGTH;

    // for (; i < width; i += c) {
    //   ctx.beginPath();

    //   ctx.rect(x + i, y, c, c);

    //   ctx.stroke();
    //   ctx.fill();
    // }
  }
}

export default IShape;
