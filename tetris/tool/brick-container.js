const COLORS = ["#F4B400", "#34A853", "#4285F4", "#EA4335"];

const BrickItem = Vue.defineComponent({
  props: ["style"],
  template: `
    <div
      class="brick-item"
      :style="style"
      @click="$emit('itemClick')"
    />
  `,
});

const BrickList = Vue.defineComponent({
  props: ["status", "dataSource"],
  components: { BrickItem },
  data() {
    return { colors: COLORS };
  },
  template: `
    <div class="brick-list">
      <template v-for="(list, row) in dataSource" >
        <template v-for="(item, col) in list" :key="col">
          <brick-item
            :style="{ backgroundColor: item === 1 ? '#9aa0a6': colors[status] }"
            @itemClick="$emit('update', row, col, item, status)"
          />
        </template>
      </template>
    </div>
  `,
});

const BrickContainer = Vue.defineComponent({
  props: ["statusList", "dataSource"],
  emits: ["click"],
  components: { BrickList },
  template: `
    <template v-for="status in statusList" :key="status">
      <brick-list
        :status="status"
        :dataSource="dataSource[status]"
        @update="onClick"
      />
    </template>
  `,
  methods: {
    onClick(...args) {
      this.$emit("click", ...args);
    },
  },
});

export { BrickContainer };
