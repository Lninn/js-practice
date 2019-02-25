class Block extends GameImage {
  constructor(game, { x, y, lives = 1}) {
    super(game, 'blockRed', x, y)

    this.setup(lives)
  }

  setup(lives) {
    this.alive = true
    this.lives = lives

    this.h += 1

    // 减少碰撞的误差
    this.w -= 8
    this.h -= 7

    this.colors = {
      1: 'blockRed',
      2: 'blockBlue',
      3: 'blockYellow',
      4: 'blockGreen',
      5: 'blockPurple',
    }
  }

  collide(ball) {
    return intersect(this, ball) && this.alive
  }

  addLives() {
    if (this.lives >= Object.keys(this.colors).length) {
      this.lives = 0
    } else {
      this.lives += 1
    }
  
    if (this.lives <= 0) {
      this.alive = false
    } else {
      this.alive = true
    }
  }

  kill() {
    this.lives -= 1
    if (this.lives <= 0) {
      this.lives = 0
      this.alive = false
    }
  }

  draw() {
    this.image = this.game.images[this.colors[this.lives]]
    
    if (this.alive) {
      super.draw()
    }
  }
}