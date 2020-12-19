import { UTILS } from "../utils";

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

const BrickList = Vue.defineComponent({
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

Vue.createApp({
  template: `
  <div class="tool-container">
    <div class="header">
      <span>Brick alphabet：</span>
      <select :value="alphabet" @input="alphabetChange">
        <option v-for="(value, name, index) in alphabets">
          {{ value }}
        </option>
      </select>
    </div>
    <BrickList :dataSource="dataSource" @update="dataUpdate" />
    <div class="footer">
      <button @click="onSave">保存</button>
    </div>
  </div>
`,
  components: {
    BrickList,
  },
  data() {
    return {
      alphabets: "I J L O S T Z".split(" "),
      alphabet: "I",
      dataSource: initBrickData(),
    };
  },
  methods: {
    alphabetChange(e) {
      const i = e.target.value;
      this.alphabet = i;
    },
    dataUpdate(row, col, value) {
      this.dataSource[row][col] = !value;
    },
    onSave() {
      const KEY = "tetris";

      let i;
      i = localStorage.getItem(KEY);
      UTILS.log(i);

      if (i === null) {
        i = {
          [this.alphabet]: this.dataSource,
        };
      } else {
        try {
          i = JSON.parse(i);
        } catch (error) {
          i = {};
        }

        i = {
          ...i,
          [this.alphabet]: this.dataSource,
        };
      }

      localStorage.setItem(KEY, JSON.stringify(i));
    },
  },
}).mount("#tool");
