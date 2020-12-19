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
          if ((column === 0 && row === c * 2) || (column === c && row === 0)) {
            continue;
          }
        } else {
          // truned
          if ((column === 0 && row === 0) || (column === c * 2 && row === c)) {
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

export default ZShape;
