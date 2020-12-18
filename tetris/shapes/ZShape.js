import Shape from "./shape";
import { CONSTENT } from "../constant";

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

export default ZShape;
