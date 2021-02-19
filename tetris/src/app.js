import { Config, isPaused } from './constant'
import { utils } from './utils'
import { StartScene } from './scene'
import '../index.css'

export default class App {
  constructor() {
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
    this.paused = false

    this.actions = {}
    this.currentScene = new StartScene(this)
  }

  setup() {
    const self = this

    document.addEventListener('keydown', function (e) {
      self.onKeyDown(e)
    })
  }

  replaceScene(s) {
    this.currentScene = s
  }

  registerOfAction(key, action) {
    this.actions[key] = action
  }

  onKeyDown(e) {
    const keyCode = e.keyCode
    let isUpdated = true

    if (isPaused(keyCode)) {
      this.paused = !this.paused
      isUpdated = false
    } else {
      isUpdated = this.handlerEvent(keyCode)
    }

    if (isUpdated) {
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

  start() {
    let delta = 0,
      lastFrameTimeMs = 0,
      timestep = 1000 / 60

    const self = this

    function mainLoop(timestamp) {
      delta += timestamp - lastFrameTimeMs
      lastFrameTimeMs = timestamp

      let numUpdateSteps = 0
      while (delta >= timestep) {
        self.update(timestep)
        delta -= timestep

        if (++numUpdateSteps >= 240) {
          panic()
          break
        }
      }

      self.draw(delta / timestep)

      requestAnimationFrame(mainLoop)
    }

    function panic() {
      delta = 0
    }

    mainLoop(0)
  }

  update(delta) {
    if (this.paused) {
      return
    }

    this.currentScene.update(delta)
  }

  draw(interp) {
    const { context } = this
    context.clearRect(0, 0, Config.CanvasWidth, Config.CanvasHeight)

    this.currentScene.draw()
  }
}
