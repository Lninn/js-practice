import IShape from "./shapes/IShape";
import OShape from "./shapes/OShape";
import SShape from "./shapes/SShape";
import ZShape from "./shapes/ZShape";
import { CONSTENT, KEY_CODES } from "./constant";
import { UTILS } from "./utils";

const canvas = UTILS.$("#canvas");
const context = canvas.getContext("2d");

canvas.width = 320;
canvas.height = 482;

context.scale(2, 2);

context.strokeStyle = CONSTENT.STROKE;
context.fillStyle = CONSTENT.FILL;
context.lineWidth = CONSTENT.LINE_WIDTH;

// shapes i l j o z s t

const shapePool = [
  new SShape({
    x: 60,
    y: 0,
  }),
  // new ZShape({
  //   x: 60,
  //   y: 0
  // }),
  // new IShape({
  //   x: 90,
  //   y: 0
  // })
];

let currentIndex = 0;
let currentShape = shapePool[currentIndex];

let paused = false;

function onKeyDown(e) {
  const keyCode = e.keyCode;

  if (paused) {
    return;
  }

  if (keyCode === KEY_CODES.SPACE) {
    currentShape.changeShape && currentShape.changeShape();
  }

  if (keyCode === KEY_CODES.LEFT) {
    currentShape.moveLeft();
  }

  if (keyCode === KEY_CODES.RIGHT) {
    currentShape.moveRight();
  }
}

// Box width
var bw = 300;
// Box height
var bh = 450;
// Padding
var p = 0;

function drawBoard() {
  for (var x = 0; x <= 300; x += CONSTENT.SIDE_LENGTH) {
    context.moveTo(0.5 + x + p, p);
    context.lineTo(0.5 + x + p, bh + p);
  }

  for (var x = 0; x <= 450; x += CONSTENT.SIDE_LENGTH) {
    context.moveTo(p, 0.5 + x + p);
    context.lineTo(bw + p, 0.5 + x + p);
  }
  context.strokeStyle = "black";
  context.stroke();
}

function isEnd(shape) {
  const { y } = shape;
  const h = shape.getHeight();

  return y + h >= 240;
}

function run() {
  if (paused) {
    return;
  }

  context.clearRect(0, 0, 300, 450);

  drawBoard();

  if (isEnd(currentShape)) {
    // paused = true;
    // console.log("end");
    //     currentIndex = (currentIndex + 1) % shapePool.length;
    //     currentShape.y = 0;
    //     currentShape = shapePool[currentIndex];
  }

  currentShape.render(context);
}

let req;

function start() {
  req = requestAnimationFrame(start);
  run();
}

export function main() {
  document.addEventListener("keydown", onKeyDown);

  setInterval(function () {
    if (paused) {
      return;
    }

    if (isEnd(currentShape)) {
      paused = true;
      return;
    }

    currentShape.update();
  }, 300);

  try {
    start();
  } catch (e) {
    cancelAnimationFrame(req);
    console.error("RUNTIME ", e);
  }
}

// UTILS.log(canvas);

function reset() {
  paused = false;
  currentShape.y = 0;
}

main();
