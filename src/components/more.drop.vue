 <template>
  <div class="more-drop-content dropdown">
    <header class="drop-header">
      <div class="header-text">More</div>
      <button class="close-header" @click="closeDropdown()">
        X
      </button>
    </header>
    <div class="boards-list" >
      <div class="board-details">Recent boards</div>
      <div class="board-details">Starred boards</div>
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

  },
};
</script>