class Spirit {
  constructor(game, name, x = 0, y = 0, w = this.w, h = this.h) {
    this.game = game
    this.name = name
    this.x = x
    this.y = y

    // log(game, name)
    const img = game.imageByName(name)
    this.w = img.width
    this.h = img.height
    this.image = img
  }

  static new(...args) {
    return new this(...args)
  }

  draw() {
    this.game.context.drawImage(this.image, this.x, this.y, this.w, this.h)
  }
}