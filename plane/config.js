const config = {
  canvas_id: {
    value: 'id-canvas',
    display: false,
  },
  status: {
    value: true,
    label: '游戏状态'
  },
  w: {
    value: 500,
    label: '主界面宽度',
    max: 1000,
  },
  h: {
    value: 800,
    label: '主界面高度',
    max: 1000,
  },
  plane_speed: {
    value: 10,
    label: '飞机速度',
  },
  bullet_speed: {
    value: 10,
    label: '子弹速度',
  },
  bullet_cooldown: {
    value: 20,
    label: '子弹冷却速度',
    max: 40,
  },
  images: {
    bg1: 'img/bg_1.png',
    bullet1: 'img/bullet_1.png',
    enemy1: 'img/enemy_1.png',
    plane1: 'img/plane.png',
    boom1: 'img/boom_1.gif',
    explosion1: 'img/explosion_1.png'
  }
}