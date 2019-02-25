class SceneEditor extends Scene {
  constructor(game) {
    super(game)

    this.init()
  }

  init() {
    this.setEditorVar()
    this.setKeydownEvent()
    this.setMouseEvent()
   
    this.setText()
  }

  setEditorVar() {
    this.enableEdit = false
    this.enableDrag = false
    this.boardArea = {
      x: 20,
      y: 10,
      w: this.w - 40,
      h: 40,
    }

    this.fontSize = 25

    this.blockList = new BlockList(this)

    this.bg = GameImage.new(this.game, 'bg1')
    this.addElement(this.bg)
  }

  setKeydownEvent() {
    const self = this
    this.addKEvent('123456789', function(num) {
      self.handleLevel(num)
    })

    this.addKEvent('c', function() {
      self.blockList.clear()
    })

    this.addKEvent('s', function() {
      self.blockList.setData()
    })

    this.addKEvent('r', function() {
      self.toggle()
    })
  }

  setMouseEvent() {
    const c = this.game.canvas
    const self = this

    c.addEventListener('click', function(event) {
      const point = {
        x: event.offsetX,
        y: event.offsetY,
      }

      self.checkPoint(point)
    })

    c.addEventListener('mousedown', this.mousedown.bind(this))

    c.addEventListener('mousemove', this.mousemove.bind(this))

    c.addEventListener('mouseup', this.mouseup.bind(this))
  }

  setText() {
    const c = this.game.context
    this.directText = GameText.new(c, {
      text: '返回(R) 清空(C) 保存(S)',
      fontSize: this.fontSize,
      style: '#2b1216',
      x: this.boardArea.x + 100,
      y: this.boardArea.y + this.fontSize + (this.boardArea.h - this.fontSize) / 2,
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
    if (!this.enableEdit) {
      this.enableEdit = true
      this.blockList.setPointList(num)

      this.addElement(this.directText)
      this.addElement(this.blockList)
   
      this.removeElement(this.titleText)
      this.removeElement(this.tipText)
    }
  }

  toggle() {
    if (this.enableEdit) {
      this.enableEdit = !this.enableEdit
      this.removeElement(this.directText)
      this.blockList.clear(false)

      this.addElement(this.titleText)
      this.addElement(this.tipText)
    } else {
      const s = SceneTitle.new(this.game)
      this.done()
      this.game.replaceScene(s)
    }
  }

  checkPoint(point) {
    if (!this.enableEdit || hasPoint(this.boardArea, point)) {
      return
    }

    this.blockList.setBlock(point)
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

    const point = {
      x: event.offsetX,
      y: event.offsetY,
    }

    this.checkPoint(point)
  }

  mouseup(event) {
    this.enableDrag = false
  }
}