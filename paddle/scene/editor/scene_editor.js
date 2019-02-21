class SceneEditor extends Scene {
  constructor(game) {
    super(game)

    this.setup()
    this.init()
  }

  setup() {
    super.setup()

    this.enableEdit = false
    this.currentLevel = 1
    // 先将所有位置数据以数组的形式保存
    this.levels = []
    this.bg = GameImage.new(this.game, 'editorBg')
   
    this.positions = []
    this.blocks = []
  }

  init() {
    // event
    const self = this

    // this.events['c'] = function() {
    //   self.setData(self.currentLevel, [])
    // }

    // this.registerAction('c', function() {
    //   self.setData(self.currentLevel, [])
    // })

    // this.registerAction('s', function() {
    //   self.setData(self.currentLevel, self.levels)
    // })

    this.events['r'] = function(event) {
      self.toggle(event)
    }
    this.events['123456789'] = function(event) {
      const k = event.key

      if ('123456789'.includes(k) && !self.enableEdit) {
        self.loadLevel(k)
      }
    }

    // bindEvent(window, 'keydown', function(event) {
    //   const k = event.key

    //   if ('123456789'.includes(k) && !self.enableEdit) {
    //     self.loadLevel(k)
    //   }
    // })

    // this.registerAction('r', function() {
    //   if (self.enableEdit) {
    //     log('keydown r: ', self.enableEdit)
    //     self.enableEdit = !self.enableEdit
    //   } else {
    //     const s = SceneTitle.new(self.game)
    //     self.game.replaceScene(s)
    //   }
    // })

    this.addElement(this.bg)
    this.initBlockPosition()

    this.initEvent()
    this.initText()
    //
  }

  initEvent() {
    const self = this
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
  
  

    let enableDrag = false
    bindEvent(this.game.canvas, 'mousedown', function(event) {
      const x = event.offsetX
      const y = event.offsetY  
      
      if (x >= 0 && x <= 400) {
        if (y >= 0 && y <= 600) {
          enableDrag = true
        }
      }
    })

    bindEvent(this.game.canvas, 'mousemove', function(event) {
      const point = {
        x: event.offsetX,
        y: event.offsetY,
      }

      if (!self.enableEdit || hasPoint(self.headArea, point) || !enableDrag) {
        return
      }

      const b = self.getBlock(point)
      if (b) {
        self.changeTitle()
        self.addLevel([b.x, b.y])
        self.addElement(b)
      }
    })

    bindEvent(this.game.canvas, 'mouseup', function(event) {
      enableDrag = false
    })
  }

  initText() {
    this.title = GameText.new(this.game, {
      text: '关卡编辑器',
      x: 10,
      y: 30,
    })

    this.tips = GameText.new(this.game, {
      font: '22px 黑体',
      text: '按数字键选择你要编辑的关卡(1-9)',
      x: 30,
      y: 300,
    })

    this.addElement(this.title)
    this.addElement(this.tips)
  }

  initBlockPosition() {
   for (let i = 0; i <= 600; i += 20) {
      for (let j = 0; j <= 400; j += 40) {
        this.positions.push([j, i])
      }
    }
  }

  toggle(event) {
    if (this.enableEdit) {
      this.enableEdit = !this.enableEdit
      this.changeTitle()
      this.tips.toggle()
      this.removeBlock()
    } else {
      const s = SceneTitle.new(this.game)
      this.game.replaceScene(s)
    }
  }

  loadLevel(level) {
    const data = JSON.parse(localStorage.getItem('LEVELS')) || []
    this.levels = data[level] || []
    
    this.levels.forEach(function(l) {
      this.addBlock(l)
    }, this)
    
    this.enableEdit = true
    this.currentLevel = level
    this.changeTitle()
    this.tips.toggle()
  }

  changeTitle() {
    let t = ''
    if (this.enableEdit) {
      t = `第 ${this.currentLevel} 关 返回(R) 清空(C) 保存(S) 数量: ${this.levels.length}`
    } else {
      t = '关卡编辑器'
    }

    this.title.text = t
  }

  addBlock(point) {
    const b = Block.new(this.game, point)
    this.blocks.push(b)
    this.addElement(b)
  }

  removeBlock() {
    this.blocks.forEach(function(b) {
      this.removeElement(b)
    }, this)
  }

  addLevel(point) {
    const i = this.levels.findIndex(p => (p[0] === point[0] && p[1] === point[1]))

    if (i > 0) {
      return
    }

    this.levels.push(point)
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

  setData(num, levels) {
    log('set data: ', num, levels)

    const data = JSON.parse(localStorage.getItem('LEVELS')) || []
    data[num] = levels
    localStorage.setItem('LEVELS', JSON.stringify(data))
  }

  getData(num) {
    const data = JSON.parse(localStorage.getItem('LEVELS')) || []
    log('load data: ', num, data[num])
    return data[num] || []
  }
}