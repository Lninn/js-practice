import { Config, isPaused } from './constant'
import { utils } from './utils'
import StartScene from './scene/start'
import '../index.css'

const canvas = utils.$('#canvas')
const context = canvas.getContext('2d')

let paused = false

export default class App {
  constructor() {
    this.actions = {}
    this.currentScene = new StartScene(this)

    this.init()
    this.setup()
  }

  init() {
    const canvas = utils.$('#canvas')
    const context = canvas.getContext('2d')

    canvas.style.width = Config.CanvasWidth + 'px'
    canvas.style.height = Config.CanvasHeight + 'px'

    canvas.width = Config.CanvasWidth
    canvas.height = Config.CanvasHeight

    this.context = context
  }

  setup() {
    const self = this

    document.addEventListener('keydown', function (e) {
      self.onKeyDown(e)
    })
  }

  replaceScene(s) {
    this.currentScene = s
    this.setFps(s.fps)
  }

  setFps(fps) {
    this.interval = 1000 / fps
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
      context.clearRect(0, 0, Config.CanvasWidth, Config.CanvasHeight)

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

        context.clearRect(0, 0, Config.CanvasWidth, Config.CanvasHeight)

        self.draw()

        then = now - (delta % self.interval)
      }

      requestAnimationFrame(start)
    }

    start()
  }

  update() {
    if (paused) {
      return
    }

    this.currentScene.update()
  }

  draw() {
    this.currentScene.draw()
  }
}
