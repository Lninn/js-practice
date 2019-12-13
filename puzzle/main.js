const log = console.log.bind(console)

let e = sel => document.querySelector(sel)
let __DEV__ = true

const canvas = e('#container')
const ctx = canvas.getContext('2d')

const interval = 10
const setSize = function({ width, height }) {
    canvas.setAttribute('width', width + interval)
    canvas.setAttribute('height', height + interval)
}

const img = new Image()
img.onload = function() {
    const { width, height } = img

    setSize({ width, height })

    const source = []
    const numOfimg = 3
    const interval = 5
    const rowUnit = width / numOfimg
    const colUnit = height / numOfimg
    for (let row = 0; row < numOfimg; row++) {
        for (let col = 0; col < numOfimg; col++) {
            ctx.strokeStyle = 'blue'
            ctx.drawImage(img, row * rowUnit, col * colUnit, rowUnit, colUnit,(row * rowUnit) + interval, (col * colUnit) + interval, rowUnit, colUnit)
            ctx.strokeRect((row * rowUnit) + interval, (col * colUnit) + interval, rowUnit, colUnit)
        }
    }

    
}
img.src = 'img.jpg'