import { Config } from '../../constant'

export default class Animation {
  constructor(scene) {
    this.scene = scene

    this.setup()
  }

  setup() {
    this.life = 3

    this.yAxis = Config.BoardHeight
    this.direction = 1
  }

  update() {
    if (this.life === 0) {
      this.scene.start()
      return
    }

    if (this.yAxis === Config.BoardHeight || this.yAxis === 0) {
      this.direction *= -1
      this.life--
    }

    this.yAxis += this.direction
  }

  draw(context) {
    for (let i = this.yAxis; i <= Config.BoardHeight; i++) {
      for (let j = 0; j < Config.BoardWidth; j++) {
        context.beginPath()
        context.rect(
          j * Config.sideOfLength,
          i * Config.sideOfLength,
          Config.sideOfLength,
          Config.sideOfLength,
        )

        context.strokeStyle = Config.shape.strokeStyle
        context.fillStyle = Config.shape.fillStyle

        context.stroke()
        context.fill()
        context.closePath()
      }
    }
  }
}
