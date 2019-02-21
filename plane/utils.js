const e = sel => document.querySelector(sel)

const log = console.log.bind(console)

const imageFromPath = function(path) {
  const img = new Image()
  img.src = path
  return img
}