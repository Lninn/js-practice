import { CONSTENT } from "../constant";

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

export default Shape;
