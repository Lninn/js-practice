const log = console.log.bind(console)

let e = sel => document.querySelector(sel)
let __DEV__ = false

const debugEl = e('#debug')
const printSource = function(list) {
    __DEV__ && log('debug ', list)

    const r  = canvas.getBoundingClientRect()
    list.unshift(r)
    
    let html = ''
    for (let i = 0, len = list.length; i < len; i++) {
        const t = `
        <div class="code-block">
            <pre>
                ${JSON.stringify(list[i], null, 4)}
            </pre>
        </div>
        ` 
        html += t
    }

    debugEl.innerHTML = html
}

let mainWidth = 300
let mainHeight = 300

const canvas = e('#container')
const ctx = canvas.getContext('2d')

const padding = 12
const setSize = function({ width, height }) {
    canvas.setAttribute('width', width + padding)
    canvas.setAttribute('height', height + padding)

    mainWidth = width + padding
    mainHeight = height + padding
}

const img = new Image()
img.onload = function() {
    __main()
}
img.src = 'img.jpg'

class Puzzle {
    constructor(ctx, source) {
        this.ctx = ctx
        this.source = source

        this.blocks = new Set()

        this.init()
    }

    static getInstance(...args) {
        if (!this.instance) {
            this.instance = new this(...args)
        }

        return this.instance
    }

    init() {
        for (const raw of this.source) {
            const b = new Block(raw)
            this.addBlock(b)
        }
    }

    addBlock(b) {
        this.blocks.add(b)
    }

    getBlock({ x, y }) {
        for (const b of this.blocks) {
            const { start, end, width, height } = b

            if (x >= start && x <= start + width) {
                if (y >= end && y <= end + height) {
                    return b
                }
            }
        }

        return null
    }

    draw() {
        for (const { raw } of this.blocks) {
            this.ctx.drawImage(img, ...raw)
        }
    }
}

class Block {
    constructor(rawData) {
        this.raw = rawData

        const blockData = rawData.slice(4)
        this.blockData = blockData

        const [start, end, width, height] = blockData
        this.start = start
        this.end = end
        this.width = width
        this.height = height
    }

    static isSameBlock(b1, b2) {

    }
}

const __main = function() {
    const { width, height } = img

    setSize({ width, height })

    const config = {}

    const source = new Set()
    const numOfimg = 3
    let spacing = 3
    
    const rowUnit = Math.round(width / numOfimg)
    const colUnit = Math.round(height / numOfimg)
    for (let row = 0; row < numOfimg; row++) {
        for (let col = 0; col < numOfimg; col++) {
            // calc space
            const r = (row + 1) * spacing
            const c = (col + 1) * spacing

            const t = [
                row * rowUnit, col * colUnit,
                rowUnit, colUnit,
                (row * rowUnit) + r,
                (col * colUnit) + c,
                rowUnit, colUnit
            ]
            
            source.add(t)
        }
    }

    printSource([...source])

    const puzzle = Puzzle.getInstance(ctx, source)
   
    const borderColor = '#2f54eb'
    const fillColor = '#2f54eb'
    ctx.fillStyle = fillColor
    ctx.strokeStyle = borderColor

    puzzle.draw()

    const handleCanvasClick = function(e) {
        const { offsetX: x, offsetY: y } = e

        const b = getBlock({ x, y })
        log('click ', b)
    }

    let hasDrag = false
    const handleCanvasMouseDown = function(e) {
        hasDrag = true
    }
    const handleCanvasMouseUp = function(e) {
        hasDrag = false
    }

    let lastBlock
    const sum = function(t = []) {
        if (!t.length) {
            return 0
        }
        return t.reduce(function(a, b) {
            return a + b
        }, 0)
    }
    const isSameBlock = function(b1 = {}, b2 = {}) {
        return !!b2 && sum(b1.blockData) === sum(b2.blockData)
    }
    const handleCanvasMouseMove = function(e) {
        const { offsetX: x, offsetY: y } = e

        if (!hasDrag) {
            return
        }
        
        const b = puzzle.getBlock({ x, y })
        if (b && !isSameBlock(b, lastBlock)) {
            lastBlock = b

            ctx.clearRect(0, 0, mainWidth, mainHeight)
            ctx.drawImage(img, ...b.raw)
        }
    }

    // canvas.addEventListener('click', handleCanvasClick)

    canvas.addEventListener('mousedown', handleCanvasMouseDown)
    canvas.addEventListener('mouseup', handleCanvasMouseUp)
    canvas.addEventListener('mousemove', handleCanvasMouseMove)
}