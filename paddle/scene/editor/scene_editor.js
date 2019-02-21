class SceneEditor extends Scene {
  constructor(game) {
    super(game)

    this.setup()
    this.init()
  }

  setup() {
    this.enableEdit = false
    this.currentLevel = 1
    // 先将所有位置数据以数组的形式保存
    this.levels = []
    this.bg = GameImage.new(this.game, 'editorBg')
   
    this.positions = []
  }

  init() {
    this.addElement(this.bg)
    this.initBlockPosition()

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

    bindEvent(this.game.canvas, 'click', function(event) {
      const point = {
        x: event.offsetX,
        y: event.offsetY,
      }

      if (!self.enableEdit || hasPoint(self.headArea, point)) {
        return
      }

      const b = self.getBlock(point)
      if (b) {
        self.addElement(b)
      }
    })
    // this.game.canvas.addEventListener('click', function(event) {
   
    // })

    window.addEventListener('keydown', function(event) {
      const k = event.key

      if ('123456789'.includes(k)) {
        if (self.enableEdit) {
          return
        }

        self.enableEdit = true
        self.currentLevel = k
        self.loadLevel()
      }
    })

    let enableDrag = false
    this.game.canvas.addEventListener('mousedown', function(event) {
      const x = event.offsetX
      const y = event.offsetY  
      
      if (x >= 0 && x <= 400) {
        if (y >= 0 && y <= 600) {
          enableDrag = true
        }
      }
    })

    this.game.canvas.addEventListener('mousemove', function(event) {
      const point = {
        x: event.offsetX,
        y: event.offsetY,
      }

      if (!self.enableEdit || hasPoint(self.headArea, point) || !enableDrag) {
        return
      }

      const b = self.getBlock(point)
      if (b) {
        log('add')
        self.levels.push([b.x, b.y])
        self.addElement(b)
      }
    })

    this.game.canvas.addEventListener('mouseup', function(event) {
      enableDrag = false
    })
    //
  }

  initBlockPosition() {
   for (let i = 0; i <= 600; i += 20) {
      for (let j = 0; j <= 400; j += 40) {
        this.positions.push([j, i])
      }
    }
  }

  loadLevel() {
    const data = JSON.parse(localStorage.getItem('LEVELS'))
    this.levels = data[this.currentLevel] || []
    
    this.levels.forEach(function(level) {
      this.addBlock(level)
    }, this)
  }

  addBlock(point) {
    const b = Block.new(this.game, point)
    this.addElement(b)
  }

  getBlock(point = []) {
    for (const p of this.positions) {
      const b = Block.new(this.game, p)
      if (hasPoint(b, point)) {
        return b
      }
    }

    return null
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
    if (this.enableEdit) {
      // TODO 这里数量有问题
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