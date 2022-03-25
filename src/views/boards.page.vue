<template>
  <section class="boards-page">
    <!-- <div class="boards-page-nav"></div> -->
    <hompage-nav/>

    <div class="all-boards">
      <div v-if="boards.length" class="starred-boards-container">
        <div class="starred-boards-title">
          <span class="member-icon"></span>
          <h3 class="starred-header">Starred boards</h3>
        </div>
        <div class="starred-boards-list-container">
          <ul class="starred-boards-list">
            <li class="board-card" v-for="board in boards" :key="board._id">
              <router-link class="board-link" :to="'/board/' + board._id">
                <span class="link-block"></span>
                <div class="board-card-details">
                  <div class="card-header-name">{{ board.title }}</div>
                  <div class="card-star">
                    <span class="card-star-container">
                      <span class="star"></span>
                    </span>
                  </div>
                </div>
              </router-link>
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
          <ul class="your-boards-list">
            <li class="board-card" v-for="board in boards" :key="board._id">
              <router-link class="board-link" :to="'/board/' + board._id">
                <span class="link-block"></span>
                <div class="board-card-details">
                  <div class="card-header-name">{{ board.title }}</div>
                  <div class="card-star">
                    <span class="card-star-container">
                      <span class="star"></span>
                    </span>
                  </div>
                </div>
              </router-link>
            </li>
            <li class="create-new-board-card">
              <div class="new-board-card">
                <p>
                  <span>Create new board</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- <router-link v-for="board in boards" :to="'/board/' + board._id"
      >BOARD</router-link > -->
  </section>
</template>

<script>
import boardPreview from "../components/board.preview.vue";
import hompageNav from "../components/homepage.nav.vue"

export default {
  // props: [''],
  components: {
       boardPreview,
       hompageNav 
       },
  created() {
    this.$store.dispatch("loadBoards");
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    boards() {
      return this.$store.getters.boards || [];
    },
  },
  unmounted() {},
};
</script>