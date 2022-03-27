<template>
  <section class="main-header" :style="boardBgStyle">
    <router-link :style="textColor" class="main-logo" :to="'/board/'">Tablero</router-link>
    <div class="left-navbar">
      <div class="main-header-dropdowns">
        <div class="recent-drop">
          <button
            :style="textColor"
            class="drop-btn recent-btn"
            @click="openDropdown('recentBoardsDrop')"
          >Recent</button>
        </div>
        <div class="starred-drop">
          <button
            :style="textColor"
            class="drop-btn starred-btn"
            @click="openDropdown('starredBoardsDrop')"
          >Starred</button>
        </div>
      </div>

      <div class="create-board">
        <div class="create-board-btn-container">
          <button
            class="create-board-btn drop-btn"
            @click="openDropdown('createBoardDrop')"
            :class="toggleCreateBtnBGC"
            :style="textColor"
          >Create</button>
        </div>
        <div v-if="isCreateBoardOpen" class="create-board-modal" :class="toggleCreateBoardModal"></div>
      </div>

      <div class="seperator"></div>
    </div>
    <div class="right-navbar">
      <div class="board-search">
        <input class="main-input" :style="textColor" type="text" placeholder="Search" />
      </div>

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
  emits: ['openDrop', 'open-drop'],
  components: {
    createBoardDrop,
    recentBoardsDrop,
    starredBoardsDrop
  },
  created() {
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
    },
    boardBgStyle() {
      if (!this.bgc) return
      console.log(this.bgc)
      return this.bgc.isLight ?
        'background-color:' + this.bgc.bgc + '; opacity: .9;'
        : 'background-color:' + this.bgc.bgc + '; opacity: .9;'
    },
    textColor() {
      if (!this.bgc) return
      return this.bgc.isLight ? 'color: #172b4d' : 'color: white'

    }
  },
};
</script>