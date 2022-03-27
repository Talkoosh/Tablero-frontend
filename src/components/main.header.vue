<template>
  <section class="main-header" :style="'background-color:' + bgc + '; opacity: .9'">
    <router-link class="main-logo" :to="'/board/'">Tablero</router-link>
    <div class="left-navbar">
      <div class="main-header-dropdowns">
        <div class="recent-drop">
          <button class="drop-btn recent-btn" @click="openDropdown('recentBoardsDrop')">Recent</button>
        </div>

        <div class="starred-drop">
          <button class="drop-btn starred-btn" @click="openDropdown('starredBoardsDrop')">Starred</button>
      
        </div>
      </div>

      <div class="create-board">
        <div class="create-board-btn-container">
          <button
            class="create-board-btn drop-btn"
            @click="openDropdown('createBoardDrop')"
            :class="toggleCreateBtnBGC"
          >Create</button>
        </div>
        <div v-if="isCreateBoardOpen" class="create-board-modal" :class="toggleCreateBoardModal"></div>
      </div>

      <div class="seperator"></div>
    </div>
    <div class="right-navbar">
      <div class="board-search">
        <!-- <span>
          <img src="@/assets/img/bell.png" alt="" />
        </span>-->
        <input class="main-input" type="text" placeholder="Search" />
        <!-- </form> -->
      </div>
      <!-- <button class="right-nav-btn">
        <span>💡</span>
      </button> -->
      <div class="main-header-icon">
        <img src="@/assets/img/headerIcon.png" class="main-header-icon-img" />
      </div>
    </div>
  </section>
</template>

<script>
import createBoardDrop from "./create.board.drop.vue";
import recentBoardsDrop from "./recent.boards.drop.vue"
import starredBoardsDrop from "./starred.boards.drop.vue"
import { utilService } from "../services/util.service.js";
export default {
  emits: ['open-drop'],
  components: {
    createBoardDrop,
    recentBoardsDrop,
    starredBoardsDrop
  },
  created() {
    // eventBus.on('change-color', this.changeColor)
  },
  data() {
    return {
      isRecentDropOpen: false,
      isStarredDropOpen: false,
    };
  },
  methods: {
    toggleRecentDrop() {
      this.isRecentDropOpen = !this.isRecentDropOpen;
    },
    toggleStarredDrop() {
      this.isStarredDropOpen = !this.isStarredDropOpen;
    },
    openDropdown(cmpName) {
      this.$emit("open-drop", cmpName);
    },
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
    toggleCreateBtnBGC() {
      return
    },
    isCreateBoardOpen() {
      return
    },
    bgc() {
      return this.$store.getters.mainHeaderBgc
    }
  },
};
</script>