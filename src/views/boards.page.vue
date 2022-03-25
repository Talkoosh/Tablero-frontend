<template>
  <section class="boards-page">
    <div class="boards-page-nav"></div>

    <div class="all-boards">

      <div v-if="boards.length" class="starred-boards-container">
        <div class="starred-boards-title">
          <span class="member-icon"></span>
          <h3 class="starred-header">Starred boards</h3>
        </div>
        <div class="starred-boards-list-container">
          <ul
            class="starred-boards-list"
            v-for="board in boards"
            :key="board._id"
          >
            <li class="board-card">
                <div class="board-card-details"></div>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="boards.length" class="your-boards-container">
        <div class="your-boards-title">
          <div class="member-icon"></div>
          <h3 class="your-boards-header">Your boards</h3>
        </div>
        <div class="your-boards-list-container">
          <ul class="your-boards-list" v-for="board in boards" :key="board._id">
            <li class="board-card">
                <div class="board-card-details"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <router-link v-for="board in boards" :to="'/board/' + board._id"
      >BOARD</router-link
    >
  </section>
</template>

<script>
import boardPreview from "../components/board.preview.vue";

export default {
  // props: [''],
  components: { boardPreview },
  created() {
    this.$store.dispatch("loadBoards");
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
  },
  unmounted() {},
};
</script>