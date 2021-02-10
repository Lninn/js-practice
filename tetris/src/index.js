import { CANVAS_WIDTH, CANVAS_HEIGHT, isPaused } from './constant'
import { utils } from './utils'
import StartScene from './scene/StartScene'
import '../index.css'

const canvas = utils.$('#canvas')
const context = canvas.getContext('2d')

class App {
  constructor(context) {
    this.context = context

    this.actions = {}
    this.currentScene = new StartScene(this)

    this.setup()
  }

  setup() {
    const self = this

    document.addEventListener('keydown', function (e) {
      self.onKeyDown(e)
    })
  }

  replaceScene(s) {
    this.currentScene = s
    this.interval = 1000 / s.fps
  }

  registerOfAction(key, action) {
    this.actions[key] = action
  }

  onKeyDown(e) {
    const { context } = this

    const keyCode = e.keyCode
    let isUpdated = true

    if (isPaused(keyCode)) {
      paused = !paused
      isUpdated = false
    } else {
      isUpdated = this.handlerEvent(keyCode)
    }

    if (isUpdated) {
      context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      this.draw()
    }
  }

  handlerEvent(keyCode) {
    if (keyCode in this.actions) {
      this.actions[keyCode]()
      return true
    } else {
      return false
    }
  }

  loop() {
    let now,
      then,
      delta,
      fps = this.currentScene.fps

    this.interval = 1000 / fps

    const self = this
    function start(timestamp) {
      if (then === undefined) {
        then = timestamp
      }

      now = timestamp
      delta = now - then
      if (delta > self.interval) {
        self.update()

        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

        self.draw()

        then = now - (delta % self.interval)
      }

      requestAnimationFrame(start)
    }

    start()
  }

  update() {
    this.currentScene.update()
  }

  draw() {
    this.currentScene.draw()
  }
}

const app = new App(context)

__mian()

function __mian() {
  setup()

  app.loop()
  app.draw()
}

function setup() {
  canvas.style.width = CANVAS_WIDTH + 'px'
  canvas.style.height = CANVAS_HEIGHT + 'px'

  canvas.width = CANVAS_WIDTH
  canvas.height = CANVAS_HEIGHT
}
