import Shape from "./shape";
import { CONSTENT } from "../constant";

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

export default OShape;
