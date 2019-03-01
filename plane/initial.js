const __initial = function() {
  const renderText = (id, { label, value, step = 1, max = 100 }) => {
    let template = ''

    if (isBool(value)) {
      template = `
        <div class="item">
          <span>${label}</span>
          <button data-id="${id}" data-value="${value}">切换状态</button>
          <span>${Boolean(value) ? '运行中' : '暂停' }</span>
        </div>
      `
    } else {
      template = `
        <div class="item">
          <label for="">
            ${label}
            <input
              type="range"
              data-id="${id}"
              value="${value}"
              step="${step}"
              max="${max}"
            />
            <span>${value}</span>
          </label>
        </div>
      `
    }
   
    return template
  }

  const render = function(sel) {
    const html = Object.keys(config)
      .map(id => {
        // 这里应该换种方式
        if (config[id].hasOwnProperty('display') || id == 'images') {
          return
        } else {
          return renderText(id, config[id])
        }
      })
      .filter(item => item != undefined)
      .reduce((pre, next) => pre + next, '')

    e(sel).innerHTML = html
  }

  const bindClick = target => {
    target.addEventListener('click', e => {
      const elem = e.target
      const id = elem.dataset.id
      // value 的值在 html 中是一个字符串
      const value = toBool(elem.dataset.value)
      
      eval(`config['${id}'].value = ${!value}`)
      elem.nextElementSibling.innerText = value ? '暂停' : '运行中'
      elem.setAttribute('data-value', !value)
    })
  }

  const bindInput = target => {
    target.addEventListener('input', e => {
      const elem = e.target
      const id = elem.dataset.id
      const value = elem.value

      if ('wh'.includes(id)) {
        setCanvasSize({id})
      }

      eval(`config['${id}'].value = ${value}`)
      elem.nextElementSibling.innerText = value
    })
  }

  const bindEvents = (sels) => {
    document.querySelectorAll(sels)
      .forEach(elem => {
        if (elem.nodeName == 'BUTTON') {
          bindClick(elem)
        } else if (elem.nodeName == 'INPUT') {
          bindInput(elem)
        }
      })
  }
  
  const setCanvasSize = function(size = {}) {
    const { w = config.w.value, h = config.h.value } = size

    const c = e('#' + config.canvas_id.value)
    c.width = w
    c.height = h
  }

  setCanvasSize()

  render('.control-board')

  bindEvents('.control-board input, .control-board button')
}

__initial()