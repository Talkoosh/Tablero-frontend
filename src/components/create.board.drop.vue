 
 <template>
  <div class="create-board">
    <div class="create-board-modal" :class="toggleCreateBoardModal">
      <header class="modal-header">
        <div class="modal-title">Create board</div>
        <button class="close-create-modal-btn" @click="closeDropdown('createBoardDrop')">X</button>
      </header>
      <div class="modal-content">
        <div class="background-picker-container">
          <label for="background-picker-title">Background</label>
          <div class="background-options">
            <ul class="background-imgs-options">
              <li></li>
              <li></li>
            </ul>
            <ul class="background-colors-options">
              <li class="color-card">
                <button class="color1"></button>
              </li>
              <li class="color-card">
                <button class="color2"></button>
              </li>
              <li class="color-card">
                <button class="color3"></button>
              </li>
              <li class="color-card">
                <button class="color4"></button>
              </li>
              <li class="color-card">
                <button class="color5"></button>
              </li>
            </ul>
          </div>
        </div>

        <div class="create-board-input-container">
          <div class="input-title">Board title</div>
          <input type="text" class="create-board-input" v-model="boardToAdd.title" />
        </div>

        <button class="submit-create-btn" :class="submitStatus" @click="addBoard">Create</button>
      </div>
    </div>
  </div>
</template>

<script>
// import '' from ''
export default {
  name: "",
  components: {},
  created() { },
  data() {
    return {
      boardToAdd: { title: '', style: {} },
    };
  },
  methods: {
    async addBoard(boardToAdd) {
      if (!this.boardToAdd.title) return;
      console.log(boardToAdd);
      await this.$store.dispatch({ type: "addBoard", boardToAdd });
    },

    setBoardColor(color) {

    },

    closeDropdown(cmpName) {
      this.$emit("close-drop", cmpName);
    },
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },

    submitStatus() {
      return this.boardToAdd.title ? "submit-possible" : "submit-unpossible";
    },
  },
};
</script>