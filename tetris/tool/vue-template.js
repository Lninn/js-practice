import { UTILS } from "../utils";
import { BrickContainer } from "./brick-container";

UTILS.$("canvas").style.display = "none";

const falseValue = 0;
const trueValue = 1;

const COLORS = ["#F4B400", "#34A853", "#4285F4", "#EA4335"];

const DATA_KEY = "tetris";

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

function toString(s) {
  return s
    .map((i) => {
      return i.join("");
    })
    .join("\n");
}

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
    <div class="body">
      <brick-container
        :statusList="statusList"
        :dataSource="currentDataSource"
        @click="dataUpdate"
      />
    </div>
    <div class="footer">
      <button @click="onSave">保存</button>
    </div>
  </div>
`,
  components: {
    BrickContainer,
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
      const statusList = "0 1 2 3".split(" ");
      const alphabets = "I J L O S T Z".split(" ");
      const defaultAlphabet = alphabets[0];

      let dataSource;
      let result = {
        statusList,
        alphabets,
        alphabet: defaultAlphabet,
        dataSource: {},
      };

      let i;
      i = localStorage.getItem(DATA_KEY);
      if (i === null) {
        result.dataSource = alphabets.reduce(function (accu, nextKey) {
          accu[nextKey] = statusList.reduce(function (accu, nextStatus) {
            accu[nextStatus] = initBrick();
            return accu;
          }, {});

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
    dataUpdate(row, col, value, statusIndex) {
      // UTILS.log("dataUpdate", row, col, value, statusIndex);
      const nextValue = value === falseValue ? trueValue : falseValue;
      this.currentDataSource[statusIndex][row][col] = nextValue;
    },
    onSave() {
      this.dataSource[this.alphabet] = this.currentDataSource;
      localStorage.setItem(DATA_KEY, JSON.stringify(this.dataSource));
    },
  },
}).mount("#tool");
