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
    this.enableClick = false

    this.fontSize = 25
    this.blockList = new BlockList(this)
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

    c.addEventListener('contextmenu', function(event) {
      event.preventDefault()
      self.enableClick = true
     
      return false
    }, false)

    // c.addEventListener('click', function(event) {
    //   const point = {
    //     x: event.offsetX,
    //     y: event.offsetY,
    //   }

    //   self.enableAltKey = event.altKey
    // })

    c.addEventListener('mousedown', this.mousedown.bind(this))

    c.addEventListener('mousemove', this.mousemove.bind(this))

    c.addEventListener('mouseup', this.mouseup.bind(this))
  }

  setText() {
    const c = this.game.context

    this.titleText = GameText.new(c, {
      text: '关卡编辑',
      fontSize: 60,
      style: '#db3236',
      x: config.w / 2,
      y: 400,
      center: true,
    })
    
    this.tipText = GameText.new(c, {
      text: '按数字键选择你要编辑的关卡(1-9)',
      fontSize: 30,
      style: '#2d2e36',
      x: config.w / 2,
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
    if (!this.enableEdit
        || point.y <= this.boardArea.y + this.boardArea.h + 15 ) {
      return
    }
    this.blockList.setBlock(point)
  }

  mousedown(event) {
    const x = event.offsetX
    const y = event.offsetY  
    
    if (x >= 0 && x <= config.w && y >= 0 && y <= config.h) {
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
    event.stopPropagation()

    this.enableDrag = false
  }
}