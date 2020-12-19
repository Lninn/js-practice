import Shape from "./shape";
import { CONSTENT } from "../constant";

class IShape extends Shape {
  constructor(options) {
    super({
      ...options,
      width: CONSTENT.SIDE_LENGTH * 4,
      height: CONSTENT.SIDE_LENGTH * 1,
    });

    this.shapeStatus = 0;
  }

  changeShape() {
    this.shapeStatus = (this.shapeStatus + 1) % 4;
  }

  getHeight() {
    return this.height;
  }

  render(ctx) {
    let { x, y, width, height } = this;

    let i = 0;
    let c = CONSTENT.SIDE_LENGTH;

    for (; i < width; i += c) {
      ctx.beginPath();

      ctx.rect(x + i, y, c, c);

      ctx.stroke();
      ctx.fill();
    }
  }
}

export default IShape;
