import Shape from "./shape";
import { CONSTENT } from "../constant";

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

export default IShape;
