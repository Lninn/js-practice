import Shape from "./shapes/IShape";
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
// import "./tool/vue-template";

import config from "./config";

const canvas = UTILS.$("#canvas");
const context = canvas.getContext("2d");

const tool = UTILS.$('#tool')

const elements = [[1], [1], [1, 1]]
const interval = 30

const orinigalPoint = {
  x: interval * 3,
  y: interval * 3,
}

const indexPoints = []
elements.forEach((outerElement, outerIndex) => {
  outerElement.forEach((innerElement, innerIndex) => {
    indexPoints.push({ x: innerIndex, y: outerIndex })
  })
})

console.log('[indexPoints] ', indexPoints)

const graphPoints = indexPoints.map(point => {
  const x = orinigalPoint.x + interval * point.x
  const y = orinigalPoint.y + interval * point.y

  return { x, y }
})

function draw() {
  context.clearRect(0, 0, config.canvasWidth, config.canvasHeight)

  drawBoard()

  graphPoints.forEach(point => {
    context.beginPath();
    context.rect(point.x, point.y, interval, interval);
    context.stroke();
    context.fill();
    context.closePath();
  })
}

function changeShape() {
  draw()
}

console.log('[graphPoints] ', graphPoints)


function logToHtml(content) {
  tool.innerHTML += content
}

function initialize() {
  canvas.style.width = config.canvasWidth + "px";
  canvas.style.height = config.canvasHeight + "px";

  canvas.width = config.canvasWidth;
  canvas.height = config.canvasHeight;

  context.strokeStyle = CONSTENT.STROKE;
  context.fillStyle = CONSTENT.FILL;
  context.lineWidth = CONSTENT.LINE_WIDTH;

  document.addEventListener("keydown", onKeyDown);
}

const alphabets = "I J L O S T Z".split(" ");

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let currentIndex = 0;
let currentShape = new Shape(alphabets[1]);

function onKeyDown(e) {
  const keyCode = e.keyCode;

  if (!currentShape.isLive) {
    return;
  }

  if (keyCode === KEY_CODES.SPACE) {
    return changeShape()
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

function run() {
  context.clearRect(0, 0, config.canvasWidth, config.canvasHeight)

  drawBoard()

  graphPoints.forEach(point => {
    context.beginPath();
    context.rect(point.x, point.y, interval, interval);
    context.stroke();
    context.fill();
    context.closePath();
  })
}

let req;

function start() {
  req = requestAnimationFrame(start);
  run();
}

export function main() {
  initialize();

  draw();

  try {
    // start();
  } catch (e) {
    cancelAnimationFrame(req);
    console.error("RUNTIME ", e);
  }
}

main();
