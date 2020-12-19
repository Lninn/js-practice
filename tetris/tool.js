import { UTILS } from "./utils";

const LocalStorgeIdentity = "Hello";

function initBrickData() {
  const data = [],
    length = 5;

  let i = 0,
    j = 0;

  for (; i < length; i++) {
    data[i] = [];
    for (j = 0; j < length; j++) {
      data[i][j] = false;
    }
  }

  return data;
}

const Block = Vue.defineComponent({
  props: ["dataSource", "update"],
  template: `
    <div class="brick-list">
      <template v-for="(list, row) in dataSource">
        <template v-for="(item, col) in list">
          <div
            class="brick-item"
            :class="{ active: item }"
            @click="onBrickItemClick(row, col, item)"
          ></div>
        </template>
      </template>
    </div>
  `,
  methods: {
    onBrickItemClick(row, col, value) {
      this.$emit("update", row, col, value);
    },
  },
});

const app = Vue.createApp({
  template: `
  <div class="tool-container">
    <div class="header">
      <span>Brick alphabet：</span>
      <select v-model="alphabet">
        <option v-for="(value, name, index) in alphabets">
          {{ value }}
        </option>
      </select>
    </div>
    <Block :dataSource="dataSource" @update="dataUpdate" />
    <div class="footer">
      <button @click="onSave">保存</button>
    </div>
  </div>
`,
  components: {
    Block,
  },
  data() {
    return {
      alphabets: "I J L O S T Z".split(" "),
      alphabet: "I",
      dataSource: initBrickData(),
    };
  },
  methods: {
    dataUpdate(row, col, value) {
      this.dataSource[row][col] = !value;
    },
    onSave() {
      UTILS.log(this.dataSource, this.alphabet);
    },
  },
}).mount("#tool");

function onRangeChange(e) {
  const target = e.target;
  UTILS.log(target.value);
}

const alphabets = "I J L O S T Z".split(" ");

const data = alphabets.reduce((a, k) => {
  a[k] = [];
  return a;
}, {});

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

function applyStyle(container, style) {
  for (const key in style) {
    container.style[key] = style[key];
  }
}

function tools() {
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.top = "20px";
  div.style.display = "flex";
  div.style.flexWrap = "wrap";
  div.style.gap = "20px";

  const container = document.createElement("div");
  container.style.width = 200 + "px";
  container.style.gap = "5px";
  container.style.display = "flex";
  container.style.flexWrap = "wrap";

  const t = document.createDocumentFragment();

  let row = 0,
    column = 0;

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

  div.appendChild(container);

  for (const k of alphabets) {
  }

  document.body.appendChild(div);
}

// UTILS.log(alphabets);

export { tools };
