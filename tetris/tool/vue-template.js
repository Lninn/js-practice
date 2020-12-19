import { UTILS } from "../utils";

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
      <select v-model="alphabet">
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
    dataUpdate(row, col, value) {
      this.dataSource[row][col] = !value;
    },
    onSave() {
      UTILS.log(this.dataSource, this.alphabet);
    },
  },
}).mount("#tool");
