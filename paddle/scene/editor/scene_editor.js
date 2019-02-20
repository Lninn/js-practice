class SceneEditor extends Scene {
  constructor(game) {
    super(game)

    this.levels = []
    this.currentLevel = null
    this.start = false

    this.init()
  }

  init() {
    const self = this

    // event
    this.registerAction('c', function() {
      self.clear()
    })
    this.registerAction('s', function() {
      self.save()
      log('保存成功')
    })
    this.registerAction('r', function() {
      const s = SceneTitle.new(self.game)
      self.game.replaceScene(s)
    })

    this.game.canvas.addEventListener('click', function(event) {
      let x = event.offsetX
      let y = event.offsetY

      const hasPoint = (rect, point) => {
        if (point.x >= rect.x && point.x <= rect.x + rect.w) {
          if (point.y >= rect.y && point.y <= rect.y + rect.h) {
            return true
          }
        }
        
        return false
      }

      if (!self.start || hasPoint(self.headArea, { x, y, })) {
        return
      }
      self.levels.push([x, y])
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
    // bg
    this.drawBg('editorBg')
    this.drawTitle('#4885ed')

    // draw text
    if (this.start) {
      let t ='第 '+ this.currentLevel + ' 关 ' + '返回(R) 清空(C) 保存(S) 数量: ' + this.levels.length
      this.drawText('16px serif', '#fff', t, { x: 10, y: 30, })
    } else {
      this.drawText('16px serif', '#fff', '关卡编辑器', { x: 10, y: 30, })
      this.drawText('22px serif', '#000', '按数字键选择你要编辑的关卡(1-9)', { x: 30, y: 300, })
    }
  
    // draw block
    this.levels.forEach(function(level) {
      const img = this.game.images['block']
 
      this.game.context.drawImage(img, level[0], level[1])
    }, this)
  }
}