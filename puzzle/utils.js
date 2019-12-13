const log = console.log.bind(console)
const e = sel => document.querySelector(sel)

const sumOfList = function(list = []) {
  if (!Array.isArray(list)) {
    log("err: 参数必须是一个数组")
    return 0
  }

  if (!arr.length) {
    return 0
  }

  return arr.reduce(function(a, b) {
    return a + b
  }, 0)
}
