<template>
  <div class="starred-drop-content dropdown">
    <header class="drop-header">
      <div class="header-text">Starred boards</div>
      <button class="close-header" @click="closeDropdown('recentBoardsDrop')">
        X
      </button>
    </header>
    <div class="boards-list" v-for="board in boards" :key="board._id">
      <router-link class="board-details" :to="'/board/' + board._id">
        <div
          class="board-cover-container"
          :style="cardBG(board.style)"
        ></div>
        <div class="board-text">
          <div class="board-title">{{ board.title }}</div>
          <!-- <div class="board-user">{{ board.createdBy.fullname }} workspace</div> -->
        </div>
        <!-- <div class="star-container">
          <span class="star"></span>
        </div> -->
      </router-link>
    </div>
  </div>
</template>

<script>
// import '' from ''
export default {
  name: "",
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {
    closeDropdown(cmpName) {
      this.$emit("close-drop", cmpName);
    },
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
    cardBG() {
      return (style) => {
        if (style.photo) return `background-image: url(${style.photo})`;
        else return `background-color: ${style.backgroundColor}`;
      };
    },
  },
};
</script>