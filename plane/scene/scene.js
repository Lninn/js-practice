class Scene {
  constructor(ctx) {
    this.ctx = ctx

    // 状态按键
    this.actions = {}
  }

  static new(...args) {
    return new this(...args)
  }

  registerAction(key, action) {
    if (key.length > 1) {
      for (const k of key) {
        this.actions[k] = action
      }
    } else {
      this.actions[key] = action
    }
  }
}