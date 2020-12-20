import { UTILS } from "../utils";

const falseValue = 0;
const trueValue = 1;

function initBrick() {
  const data = [],
    length = 5;

  let i = 0,
    j = 0;

  for (; i < length; i++) {
    data[i] = [];
    for (j = 0; j < length; j++) {
      data[i][j] = falseValue;
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
            :class="{ active: item === 1 }"
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

const DATA_KEY = "tetris";

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
    <BrickList :dataSource="currentDataSource" @update="dataUpdate" />
    <div class="footer">
      <button @click="onSave">保存</button>
    </div>
  </div>
`,
  components: {
    BrickList,
  },
  data() {
    const ret = this.initialize();
    UTILS.log(ret);

    return {
      ...ret,
    };
  },
  computed: {
    currentDataSource: {
      get() {
        return this.dataSource[this.alphabet];
      },
      set(newValue) {
        this.dataSource = newValue;
      },
    },
  },
  methods: {
    initialize() {
      const defaultAlphabet = "I";
      const alphabets = "I J L O S T Z".split(" ");

      let dataSource;
      let result = {
        alphabets,
        alphabet: defaultAlphabet,
        dataSource: {},
      };

      let i;
      i = localStorage.getItem(DATA_KEY);
      if (i === null) {
        result.dataSource = alphabets.reduce(function (accu, nextKey) {
          accu[nextKey] = initBrick();

          return accu;
        }, {});

        return result;
      }

      try {
        i = JSON.parse(i);

        dataSource = alphabets.reduce(function (accu, nextKey) {
          if (i.hasOwnProperty(nextKey)) {
            accu[nextKey] = i[nextKey];
          } else {
            accu[nextKey] = [];
          }

          return accu;
        }, {});
      } catch (error) {
        i = {};
      }

      result.dataSource = dataSource;

      return result;
    },
    alphabetChange(e) {
      const i = e.target.value;
      this.alphabet = i;
    },
    dataUpdate(row, col, value) {
      const nextValue = value === falseValue ? trueValue : falseValue;
      this.currentDataSource[row][col] = nextValue;
    },
    onSave() {
      this.dataSource[this.alphabet] = this.currentDataSource;

      localStorage.setItem(DATA_KEY, JSON.stringify(this.dataSource));
    },
  },
}).mount("#tool");
