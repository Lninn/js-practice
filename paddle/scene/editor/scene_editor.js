class GameInfo {

}



class SceneEditor extends Scene {
  constructor(game) {
    super(game)

    this.init()
  }

  init() {
    this.setEditorVar()
    this.setKeydownEvent()
    this.setMouseEvent()
    this.initBlockPosition()

    // 设置信息显示的区域
    this.boardArea = {
      x: 20,
      y: 10,
      w: this.w - 40,
      h: 40,
    }
   
    this.initText()
  }

  setEditorVar() {
    this.enableEdit = false
    this.currentLevel = 1
    this.enableDrag = false
   
    this.levels = []
    this.positions = []
    this.blocks = []

    this.bg = GameImage.new(this.game, 'bg1')
    this.addElement(this.bg)
  }

  setKeydownEvent() {
    const self = this
    this.addKEvent('123456789', function(num) {
      self.handleLevel(num)
    })

    this.addKEvent('c', function() {
      self.clear()
    })

    this.addKEvent('s', function() {
      self.save()
    })

    this.addKEvent('r', function() {
      self.toggle()
    })
  }

  setMouseEvent() {
    const c = this.game.canvas

    c.addEventListener('click', this.getPosition.bind(this))
    c.addEventListener('mousedown', this.mousedown.bind(this))
    c.addEventListener('mousemove', this.mousemove.bind(this))
    c.addEventListener('mouseup', this.mouseup.bind(this))
  }

  initText() {
    // 初始化所有的文本
    const c = this.game.context

    this.controlText = GameText.new(c, {
      text: '1 关 返回(R) 清空(C) 保存(S) 数量: 0',
      fontSize: 20,
      style: '#2b1216',
      x: this.boardArea.x,
      y: this.boardArea.y + 20 + (this.boardArea.h - 20) / 2,
    })

    this.titleText = GameText.new(c, {
      text: '关卡编辑',
      fontSize: 60,
      style: '#db3236',
      x: this.w / 2,
      y: 400,
      center: true,
    })
    
    this.tipText = GameText.new(c, {
      text: '按数字键选择你要编辑的关卡(1-9)',
      fontSize: 30,
      style: '#2d2e36',
      x: this.w / 2,
      y: 500,
      center: true,
    })

    this.addElement(this.titleText)
    this.addElement(this.tipText)
  }

  handleLevel(num) {
    log('handle level ', num)
    if (!self.enableEdit) {
      this.enableEdit = true
      this.currentLevel = num
  
      const ps = this.getData(num)
      
      if (ps.length !== 0) {
        for (const p of ps) {
          const b = Block.new(this.game, [p.x, p.y])
          this.addBlock(b)
        }
      }

      this.controlText.changeText(`第 ${this.currentLevel} 关 返回(R) 清空(C) 保存(S) 数量: 10`)
      this.addElement(this.controlText)
      this.removeElement(this.titleText)
      this.removeElement(this.tipText)
    }
  }

  initBlockPosition() {
   for (let i = 0; i <= this.h; i += 32) {
      for (let j = 0; j <= this.w; j += 64) {
        this.positions.push([j, i])
      }
    }
  }

  toggle() {
    // log('toggle')
    if (this.enableEdit) {
      this.enableEdit = !this.enableEdit
      this.removeBlock()
    } else {
      const s = SceneTitle.new(this.game)
      this.done()
      this.game.replaceScene(s)
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

  addBlock(block) {
    this.blocks.push(block)
    this.levels.push({
      x: block.x,
      y: block.y,
    })
    
    this.addElement(block)
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

  save() {
    this.setData(this.currentLevel, this.levels)
  }

  // draw() {
  //   super.draw()

  //   // this.drawArea(this.boardArea)
  //   // this.drawText(this.controlText)
  //   // this.drawText(this.tipText)
  // }
} // 206