class SceneEditor extends Scene {
  constructor(game) {
    super(game)

    this.setup()
    this.init()
  }

  setup() {
    this.levels = []
    this.currentLevel = null
    this.start = false
    this.bg = GameImage.new(this.game, 'editorBg')
  }

  init() {
    this.addElement(this.bg)

    // event
    const self = this
    this.registerAction('c', function() {
      self.clear()
      log('清除当前数据')
    })
    this.registerAction('s', function() {
      self.save()
      log('保存当前数据')
    })
    this.registerAction('r', function() {
      const s = SceneTitle.new(self.game)
      self.game.replaceScene(s)
    })

    this.game.canvas.addEventListener('click', function(event) {
      const point = {
        x: event.offsetX,
        y: event.offsetY,
      }

      const bool = self.levels.some(function(level) {
        const o = {
          w: 40,
          h: 19,
          x: level[0],
          y: level[1], 
        }

        return hasPoint(o, point)
      })
      
      if (!self.start || hasPoint(self.headArea, point) || bool) {
        return
      }

      self.levels.push([point.x, point.y])
      self.addBlock([point.x, point.y])
    })

    window.addEventListener('keydown', function(event) {
      const k = event.key

      if ('123456789'.includes(k)) {
        // if (self.start) {
        //   return
        // }

        self.start = true
        self.currentLevel = k
        self.loadLevel(Number(k))
      }
    })
  }

  loadLevel(level) {
    const data = JSON.parse(localStorage.getItem('LEVELS'))
    this.levels = data[level] || []
    
    this.levels.forEach(function(level) {
      this.addBlock(level)
    }, this)
  }

  addBlock(point) {
    const b = Block.new(this.game, point)
    this.addElement(b)
  }

  clear() {
    if (this.levels.length === 0) {
      return
    }

    this.levels = []

    const levels = JSON.parse(localStorage.getItem('LEVELS'))
    levels[this.currentLevel] = this.levels
    localStorage.setItem('LEVELS', JSON.stringify(levels))
  }

  save() {
    if (this.levels.length === 0) {
      return
    }

    const levels = JSON.parse(localStorage.getItem('LEVELS'))
    levels[this.currentLevel] = this.levels
    localStorage.setItem('LEVELS', JSON.stringify(levels))
  }

  draw() {
    super.draw()

    this.drawHead('#4885ed')

    // draw text
    if (this.start) {
      let t ='第 '+ this.currentLevel + ' 关 ' + '返回(R) 清空(C) 保存(S) 数量: ' + this.levels.length
      this.drawText({
        font: '16px 黑体',
        text: t,
        x: 10,
        y: 30, 
      })
    } else {
      this.drawText({
        style: '#fff',
        text: '关卡编辑器',
        x: 10,
        y: 30, 
      })

      this.drawText({
        font: '22px 黑体',
        text: '按数字键选择你要编辑的关卡(1-9)',
        x: 30,
        y: 300, 
      })
    }
  }
}