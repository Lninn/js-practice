const e = sel => document.querySelector(sel)

const log = console.log.bind(console)

// const imageFromPath = function(path) {
//   const img = new Image()
//   img.src = path
//   return img
// }

const between = function(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start 
}