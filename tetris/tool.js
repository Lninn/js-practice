import { UTILS } from "./utils";
const container = document.createElement("div");

function onRangeChange(e) {
  const target = e.target;
  UTILS.log(target.value);
}

const table = [];

const saveBtn = document.createElement("button");
saveBtn.appendChild(document.createTextNode("SAVE"));
saveBtn.onclick = function () {
  var a = table.map((item) => {
    return item
      .map((x) => {
        return x ? 1 : 0;
      })
      .join("");
  });

  UTILS.log(a.join("\n"));
};

const range = document.createElement("input");
range.type = "range";
range.value = 3;
range.max = 15;
range.step = 1;
range.oninput = onRangeChange;

container.style.width = 200 + "px";
container.style.gap = "5px";
container.style.display = "flex";
container.style.flexWrap = "wrap";

const config = {
  cellSize: 30,
  width: 5,
  height: 5,
};

const createBlock = function (i, j) {
  const b = document.createElement("div");
  b.style.width = 1 * config.cellSize + "px";
  b.style.height = 1 * config.cellSize + "px";
  b.style.background = "#ccc";
  b.style.cursor = "pointer";

  b.dataset.visted = "0";

  b.onclick = onBlockClick.bind(null, i, j);
  return b;
};

function onBlockClick(i, j, e) {
  UTILS.log("onBlockClick ", i, j, e);

  const el = e.target;
  const visted = el.dataset.visted;

  let c = "0";
  if (visted === "0") {
    el.style.background = "red";
    c = "1";
  } else {
    el.style.background = "#ccc";
  }

  table[i][j] = c === "1";

  el.dataset.visted = c;
}

function tools() {
  let row = 0,
    column = 0;

  const t = document.createDocumentFragment();

  for (; row < config.height; row++) {
    table[row] = [];
    for (column = 0; column < config.width; column++) {
      t.appendChild(createBlock(row, column));

      table[row][column] = false;
    }
  }

  container.appendChild(t);
  container.appendChild(range);
  container.appendChild(saveBtn);

  document.body.appendChild(container);
}

export { tools };
