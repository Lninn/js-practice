export default class Animation {
  constructor(app) {
    this.app = app

    this.reset()
  }

  reset() {
    this.isAnimation = false
    this.numOfFrame = 1
  }

  open() {
    this.isAnimation = true
    this.app.setFps(5)
  }

  close() {
    this.app.setFps(1)
    this.reset()
  }

  next() {
    this.numOfFrame += 1
  }

  displayOnFrame() {
    return this.numOfFrame % 2 === 0
  }

  isTail() {
    return this.numOfFrame === 10
  }
}
