const log = console.log.bind(console)

const debug = function(...args) {
  log("DEBUG# ", ...args)
}

const e = sel => document.querySelector(sel)

const sumOfList = function(list = []) {
  if (!Array.isArray(list)) {
    log("err: 参数必须是一个数组")
    return 0
  }

  if (!list.length) {
    return 0
  }

  return list.reduce(function(a, b) {
    return a + b
  }, 0)
}
