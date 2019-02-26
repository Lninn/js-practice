class Spirit {
  constructor(game, name, x = 0, y = 0, w, h) {
    this.game = game
    this.name = name
    this.x = x
    this.y = y

    // log(game, name)
    const img = game.imageByName(name)
    this.w = w || img.width
    this.h = h || img.height
    this.image = img
  }

  static new(...args) {
    return new this(...args)
  }

  draw() {
    this.game.context.drawImage(this.image, this.x, this.y, this.w, this.h)
  }
}