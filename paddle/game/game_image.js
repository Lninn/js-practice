class GameImage {
  constructor(game, name, x = 0, y = 0) {
    this.game = game
    this.name = name
    this.x = x
    this.y = y

    this.init()
  }

  init() {
    const img = this.game.imageByName(this.name)
    this.image = img.image
    this.w = img.w
    this.h = img.h
  }

  static new(...args) {
    return new this(...args)
  }

  draw() {
    this.game.context.drawImage(this.image, this.x, this.y)
  }
}