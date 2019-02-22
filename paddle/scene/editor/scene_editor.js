class SceneEditor extends Scene {
  constructor(game) {
    super(game)

    this.init()
  }

  init() {
    this.enableEdit = false
    this.currentLevel = 1
    this.enableDrag = false

    // 先将所有位置数据以数组的形式保存
    this.levels = []

    this.bg = GameImage.new(this.game, 'bg1')
    this.positions = []
    this.blocks = []

    const canvas = this.game.canvas
    this.w = canvas.width
    this.h = canvas.height

    // keydown event
    const self = this
    this.addKEvent('123456789', function(key) {
      if ('123456789'.includes(key) && !self.enableEdit) {
        self.loadLevel(key)
      }
    })

    this.addKEvent('c', function() {
      self.clear()
    })

    this.addKEvent('s', function() {
      self.setData(self.currentLevel, self.levels)
    })

    this.addKEvent('r', function() {
      self.toggle()
    })

    this.addElement(this.bg)
    this.initBlockPosition()

    this.initEvent()
    this.initText()
    //
  }

  initEvent() {
    const c = this.game.canvas

    c.addEventListener('click', this.getPosition.bind(this))
    c.addEventListener('mousedown', this.mousedown.bind(this))
    c.addEventListener('mousemove', this.mousemove.bind(this))
    c.addEventListener('mouseup', this.mouseup.bind(this))
  }

  initText() {
    this.title = GameText.new(this.game, {
      font: '60px 黑体',
      style: '#db3236',
      text: '关 卡 编 辑',
      x: 150,
      y: 300,
    })

    this.tips = GameText.new(this.game, {
      font: '26px 黑体',
      style: 'rgba(0, 0, 0, 0.7)',
      text: '按数字键选择你要编辑的关卡(1-9)',
      x: 130,
      y: 450,
    })

    this.addElement(this.title)
    this.addElement(this.tips)
  }

  initBlockPosition() {
   for (let i = 0; i <= this.h; i += 32) {
      for (let j = 0; j <= this.w; j += 64) {
        this.positions.push([j, i])
      }
    }
  }

  toggle() {
    if (this.enableEdit) {
      this.enableEdit = !this.enableEdit
      this.changeTitle()
      this.tips.toggle()
      this.removeBlock()
    } else {
      const s = SceneTitle.new(this.game)
      this.done()
      this.game.replaceScene(s)
    }
  }

  loadLevel(level) {
    this.enableEdit = true
    this.currentLevel = level
    this.tips.toggle()

    const data = JSON.parse(localStorage.getItem('LEVELS')) || []
    const ps = data[level] || []
    
    if (ps.length !== 0) {
      for (const p of ps) {
        const b = Block.new(this.game, [p.x, p.y])
        this.addBlock(b)
      }
    } else {
      this.changeTitle()
    }
  }

  getPosition(event) {
    const point = {
      x: event.offsetX,
      y: event.offsetY,
    }

    if (!this.enableEdit || hasPoint(this.headArea, point)) {
      return
    }

    const b = this.getBlock(point)
    if (!b) {
      return
    }
    
    // 判断重复
    const i = this.levels.findIndex(function(p) {
      return p.x === b.x && p.y === b.y
    })

    if (i > 0 || !b) {
      return
    }

    this.addBlock(b)
  }

  changeTitle() {
    let o = {}
    if (this.enableEdit) {
      o = {
        text: `第 ${this.currentLevel} 关 返回(R) 清空(C) 保存(S) 数量: ${this.levels.length}`,
        font: '16px 微软雅黑',
        style: 'black',
        x: 10,
        y: 30,
      }
    } else {
      o = {
        font: '60px 黑体',
        style: '#db3236',
        text: '关 卡 编 辑',
        x: 150,
        y: 300,
      }
    }

    Object.assign(this.title, o)
  }

  addBlock(block) {
    this.blocks.push(block)
    this.levels.push({
      x: block.x,
      y: block.y,
    })
    
    this.addElement(block)
    this.changeTitle()
  }

  removeBlock() {
    this.blocks.forEach(function(b) {
      this.removeElement(b)
    }, this)

    this.blocks = []
    this.levels = []
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

  mousedown(event) {
    const x = event.offsetX
    const y = event.offsetY  

    if (x >= 0 && x <= this.w && y >= 0 && y <= this.h) {
      this.enableDrag = true
    }
  }

  mousemove(event) {
    if (!this.enableDrag) {
      return
    }

    this.getPosition(event)
  }

  mouseup(event) {
    this.enableDrag = false
  }

  clear() {
    this.setData(this.currentLevel, [])
    this.removeBlock()
    this.changeTitle()
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
} // 206