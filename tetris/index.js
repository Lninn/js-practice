import IShape from "./shapes/IShape";
import OShape from "./shapes/OShape";
import SShape from "./shapes/SShape";
import ZShape from "./shapes/ZShape";
import { CONSTENT, KEY_CODES } from "./constant";
import { UTILS } from "./utils";

import config from "./config";


const canvas = UTILS.$("#canvas");
const context = canvas.getContext("2d");

function initialize() {
  canvas.width = config.canvasWidth;
  canvas.height = config.canvasHeight;

  context.strokeStyle = CONSTENT.STROKE;
  context.fillStyle = CONSTENT.FILL;
  context.lineWidth = CONSTENT.LINE_WIDTH;

  document.addEventListener("keydown", onKeyDown);
}

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

function drawBoard() {
  let i = 0;

  // draw vertical line
  for (; i <= config.canvasWidth; i += CONSTENT.SIDE_LENGTH) {
    context.moveTo(0.5 + i, 0);
    context.lineTo(0.5 + i, config.canvasHeight);
  }

  // draw horizontal line
  for (i = 0; i <= config.canvasHeight; i += CONSTENT.SIDE_LENGTH) {
    context.moveTo(0, 0.5 + i);
    context.lineTo(config.canvasWidth, 0.5 + i);
  }

  context.strokeStyle = CONSTENT.BOARD_STROKE_COLOR;
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
  initialize();

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

main();

UTILS.log(config);
