// class StatefulAnimation {
//   constructor(game, name) {
//     this.game = game
//     this.name = name

//     this.frames = {
//       left: [],
//       right: [],
//       front: [],
//       back: [],
//     }

//     this.direction = 'right'

//     this.addImage('front', 1, 5)
//     this.addImage('left', 5, 9)
//     this.addImage('right', 9, 13)
//     this.addImage('back', 13, 17)
    
//     this.frameCount = 5
//     this.index = 0
//     this.image = this.frames[this.direction][this.index]
//   }

//   addImage(direction, start, end) {
//     for (let i = start; i < end; i++) {
//       const name = `${this.name}${i}`
//       const img = this.game.imageByName(name)
//       this.frames[direction].push(img)
//     }
//   }

//   setDir(key) {
//     if (key == 'a') {
//       this.direction = 'left'
//     } else if (key == 'd') {
//       this.direction = 'right'
//     } else if (key == 'w') {
//       this.direction = 'front'
//     } else if (key == 's') {
//       this.direction = 'back'
//     }
//   }

//   static new(...args) {
//     return new this(...args)
//   }

//   update() {
//     if (this.frameCount <= 0) {
//       this.index = (this.index + 1) % this.frames[this.direction].length
//       this.image = this.frames[this.direction][this.index]
//       this.frameCount = 5 
//     }
//     this.frameCount -= 1
//   }

//   draw() {
//     this.game.ctx.drawImage(this.image, this.x, this.y, 100, 100)
//   }
// }

class Animation {
  constructor(game, name, x, y) {
    this.game = game
    this.name = name
    this.x = x
    this.y = y

    this.setup()
  }

  static new(...args) {
    return new this(...args)
  }

  setup() {
    this.frames = null
    this.index = 0
    this.frameCount = 5
    this.eachSize = 64
    this.lives = 60
    this.alive = true

    this.image = this.game.imageByName(this.name)
  }

  draw() {
    if (!this.alive) {
      return
    }

    this.game.ctx.drawImage(
      this.image, 
      this.frame.x,
      this.frame.y,
      this.eachSize,
      this.eachSize,
      this.x,
      this.y,
      this.eachSize,
      this.eachSize,
    )
  }
}

class StatelessAnimation extends Animation {
  constructor(game, name, x = 0, y = 0) {
    super(game, name, x, y)

    this.init()
  }

  init() {
    this.frames = []

    const rowCount = Math.ceil(this.image.width / this.eachSize)
    const columnCount = Math.ceil(this.image.height / this.eachSize)

    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < columnCount; j++) {
        this.frames.push({ x: j * this.eachSize, y: i * this.eachSize })
      }
    }

    this.frame = this.frames[this.index]
  }

  update() {
    if (this.lives < 0) {
      this.alive = false
      return
    }

    if (this.frameCount <= 0) {
      this.index = (this.index + 1) % this.frames.length
      this.frame = this.frames[this.index]
      this.frameCount = 5
    }

    this.frameCount -= 1
    this.lives--
  }
}