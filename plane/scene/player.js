class Player {
  constructor() {}

  static new(...args) {
    return new this(...args)
  }
}