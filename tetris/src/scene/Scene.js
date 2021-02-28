export default class Scene {
  constructor(app) {
    this.app = app
    this.fps = 1

    this.elements = []
  }

  add(element) {
    this.elements.push(element)
  }

  update() {
    // TODO
    for (const el of this.elements) {
      el.update()
    }
  }

  draw() {
    for (const el of this.elements) {
      el.draw()
    }
  }
}
