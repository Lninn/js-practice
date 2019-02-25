class BlockList{
  constructor(scene) {
    this.scene = scene

    this.setup()
    this.init()
  }

  setup() {
    this.positions = []
    this.blocks = []
    this.points = []
    this.texts = []

    this.level = 1

    this.w = this.scene.w
    this.h = this.scene.h
  }

  init() {
    for (let y = 0; y <= this.h; y += 32) {
      for (let x = 0; x <= this.w; x += 64) {
        this.positions.push({
          x,
          y,
        })
      }
    }
  }

  setBlock(point) {
    let b = null

    for (const p of this.positions) {
      const t = Block.new(this.scene.game, p)
      if (hasPoint(t, point)) {
        b = t
        break
      }
    }
  
    if (b !== null && this.check(b)) {
      this.blocks.push(b)
      this.points.push({
        x: b.x,
        y: b.y,
      })
      this.numOfBlock += 1
    }
  }

  check(block) {
    const i = this.points.findIndex(function(point) {
      return point.x === block.x && point.y === block.y
    })

    return i < 0
  }

  setPointList(num) {
    this.level = num
    
    const data = JSON.parse(localStorage.getItem('LEVELS')) || []
    const pointList = data[num] || []

    if (pointList.length == 0) {
      log(this.blocks)
      this.clear()     
    } else {
      for (const point of pointList) {
        const t = Block.new(this.scene.game, point)
        this.blocks.push(t)
      }
  
      this.points = this.points.concat(pointList)
      this.numOfBlock = this.points.length
    }
  }

   /**
   * 表示是否清除本地数据
   * 还是清除当前的数据
   * @param {Boolean} x: 布尔标识，默认清除本地数据
   */
  clear(bool = true) {
    this.blocks = []
    this.points = []
    
    if (bool) {
      this.setData()
    }
  }

  setData() {
    const data = JSON.parse(localStorage.getItem('LEVELS')) || []
    data[this.level] = this.points
    localStorage.setItem('LEVELS', JSON.stringify(data))
  }

  update() {
    for (const b of this.blocks) {
      b.update()
    }
  }

  drawText() {
    const c = this.scene.game.context
    const { boardArea, fontSize, enableEdit, } = this.scene

    if (!enableEdit) {
      return
    }

    c.fillStyle = '#2b1216'
    c.font = fontSize + 'px 微软雅黑'
    c.fillText(
      `第 ${this.level} 关`,
      boardArea.x,
      boardArea.y + this.scene.fontSize + (boardArea.h - this.scene.fontSize) / 2,
    )
    c.fillText(
      `数量: ${this.blocks.length}`,
      boardArea.x + 500,
      boardArea.y + this.scene.fontSize + (boardArea.h - this.scene.fontSize) / 2,
    )
  }

  draw() {
    for (const b of this.blocks) {
      b.draw()
    }

    this.drawText() 
  }
}