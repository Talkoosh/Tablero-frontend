<template>
  <div class="starred-drop-content dropdown">
    <header class="drop-header">
      <div class="header-text">Starred boards</div>
      <button class="close-header" @click="closeDropdown()">
        X
      </button>
    </header>
    <div class="boards-list" v-for="board in starredBoards" :key="board._id" >
      <a class="board-details" @click="goToBoard(board._id)">
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
      </a>
    </div>

    <p v-if="!starredBoards.length" class="no-starred-boards">Star important boards to access\n them quickly and easily.</p>
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
     async goToBoard(boardId){
      await this.$store.dispatch('loadBoards');
      this.$store.commit({type:'setCurrBoardId',boardId})
      this.$router.push('/board/' + boardId);

    }
  },
  computed: {
    starredBoards() {
      return this.$store.getters.starredBoards || [];
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