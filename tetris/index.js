import IShape from "./shapes/IShape";
import OShape from "./shapes/OShape";
import SShape from "./shapes/SShape";
import ZShape from "./shapes/ZShape";
import TShape from "./shapes/TShape";
import LShape from "./shapes/LShape";
import JShape from "./shapes/JShape";
import { CONSTENT, KEY_CODES } from "./constant";
import { UTILS } from "./utils";
import "./index.css";

// vue template
import "./tool/vue-template";

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
  new TShape({
    x: 30,
    y: 30,
  }),
];

let currentIndex = 0;
let currentShape = shapePool[currentIndex];

function onKeyDown(e) {
  const keyCode = e.keyCode;

  if (keyCode === KEY_CODES.SPACE) {
    currentShape.changeShape && currentShape.changeShape();
  }

  if (keyCode === KEY_CODES.LEFT) {
    currentShape.moveLeft();
  }

  if (keyCode === KEY_CODES.RIGHT) {
    currentShape.moveRight();
  }

  // UTILS.log(currentShape);
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

function isEnd() {
  const { y } = currentShape;
  const h = currentShape.getHeight();

  return y + h > config.canvasHeight - CONSTENT.SIDE_LENGTH;
}

function run() {
  context.clearRect(0, 0, config.canvasWidth, config.canvasHeight);

  drawBoard();

  if (isEnd()) {
    currentShape.done = true;
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

  // test
  // drawBoard();
  // currentShape.render(context);

  setInterval(function () {
    if (!currentShape.done) {
      currentShape.update();
    }
  }, 1000);

  try {
    start();
  } catch (e) {
    cancelAnimationFrame(req);
    console.error("RUNTIME ", e);
  }
}

// main();

// UTILS.log(config);

// tools();

// const btn = document.createElement("button");
// btn.appendChild(document.createTextNode("Toggle"));
// btn.onclick = function () {};
// document.body.append(btn);
