 <template>
  <div class="recent-drop-content dropdown">
    <header class="drop-header">
      <div class="header-text">Recent boards</div>
      <span class="close-header" @click="closeDropdown()">
        
      </span>
    </header>
    <div class="boards-list" v-for="board in boards" :key="board._id">
      <a class="board-details" @click="goToBoard(board._id)">
        <div
          v-if="board"
          class="board-cover-container"
          :style="cardBG(board.style)"
        ></div>
        <div class="board-text">
          <div class="board-title">{{ board.title }}</div>
          <!-- <div class="board-user">{{ board.createdBy.fullname }} board</div> -->
        </div>
      </a>
    </div>
    <p v-if="!boards" class="no-boards">You haven't boards yet. Go ahead and make your first board!</p>
  </div>
</template>

<script>
// import '' from ''
export default {
  name: "",
  components: {},
  created() {},
  data() {
    return {
    };
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