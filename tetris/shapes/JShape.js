import Shape from "./shape";
import { CONSTENT } from "../constant";

class JShape extends Shape {
  constructor(options) {
    super({
      ...options,
      width: CONSTENT.SIDE_LENGTH * 3,
      height: CONSTENT.SIDE_LENGTH * 3,
    });

    this.shapeStatus = 0;
  }

  getHeight() {
    return this.height;
  }

  changeShape() {
    this.shapeStatus = (this.shapeStatus + 1) % 4;
  }

  check(row, column) {
    let c = CONSTENT.SIDE_LENGTH;

    switch (this.shapeStatus) {
      case 0:
        return (
          column === 2 * c ||
          (row === 0 && column === 0) ||
          (row === c && column === 0)
        );
      case 1:
        return (
          row === 2 * c ||
          (row === 0 && column === c) ||
          (row === 0 && column === 2 * c)
        );
      case 2:
        return (
          column === 0 ||
          (row === c && column === 2 * c) ||
          (row === 2 * c && column === 2 * c)
        );
      case 3:
        return (
          row === 0 ||
          (row === 2 * c && column === 0) ||
          (row === 2 * c && column === c)
        );
    }

    return false;
  }

  render(ctx) {
    const { x, y, width, height } = this;

    let row = 0,
      column = 0;
    let c = CONSTENT.SIDE_LENGTH;

    for (; row < height; row += c) {
      for (column = 0; column < width; column += c) {
        if (this.check(row, column)) {
          continue;
        }

        ctx.beginPath();

        ctx.rect(x + column, y + row, c, c);

        ctx.stroke();
        ctx.fill();
      }
    }
  }
}

export default JShape;
