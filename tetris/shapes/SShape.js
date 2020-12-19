import Shape from "./shape";
import { CONSTENT } from "../constant";

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
  }

  changeShape() {
    this.isTruned = !this.isTruned;

    const t = this.width;
    this.width = this.height;
    this.height = t;
  }

  render(ctx) {
    const { x, y, width, height, isTruned } = this;

    let row = 0,
      column = 0;
    let c = CONSTENT.SIDE_LENGTH;

    for (; column < height; column += c) {
      for (row = 0; row < width; row += c) {
        if (!isTruned) {
          // normal
          if ((column === 0 && row === 0) || (column === c && row === 2 * c)) {
            continue;
          }
        } else {
          // truned
          if ((column === 0 && row === c) || (column === c * 2 && row === 0)) {
            continue;
          }
        }

        ctx.beginPath();

        ctx.rect(x + row, y + column, c, c);

        ctx.stroke();
        ctx.fill();
      }
    }
  }
}

export default SShape;
