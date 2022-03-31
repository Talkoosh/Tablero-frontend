<template>
  <section class="main-header" :style="boardBgStyle">
    <router-link :style="textColor" class="main-logo" :to="'/board/'">
      <img :src="iconColor" class="logo-icon" />
      <span class="logo-text">ablero</span>
    </router-link>
    <div class="left-navbar">
      <div class="main-header-dropdowns">
           <div class="more-drop">
          <button
            :style="textColor"
            class="drop-btn more-btn"
            @click="openDropdown('moreDrop')"
          >
            <span>More</span>
            <svg
              width="16"
              height="16"
              role="presentation"
              focusable="false"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <div class="recent-drop">
          <button
            :style="textColor"
            class="drop-btn recent-btn"
            @click="openDropdown('recentBoardsDrop')"
          >
            <span>Recent</span>
            <svg
              width="16"
              height="16"
              role="presentation"
              focusable="false"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <div class="starred-drop">
          <button
            :style="textColor"
            class="drop-btn starred-btn"
            @click="openDropdown('starredBoardsDrop')"
          >
            <span>Starred</span>
            <svg
              width="16"
              height="16"
              role="presentation"
              focusable="false"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                fill="currentColor"
              />
            </svg>
          </button>
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
      <div class="right-nav-btn">
      <span class="search">?</span>
      </div>

      <div @click="openDropdown('acountDrop')" class="main-header-icon">
        <img src="@/assets/img/headerIcon.png" class="main-header-icon-img" />
      </div>
    </div>
  </section>
</template>

<script>
import createBoardDrop from "./create.board.drop.vue";
import recentBoardsDrop from "./recent.boards.drop.vue"
import starredBoardsDrop from "./starred.boards.drop.vue"
import moreDrop from './more.drop.vue'
import { utilService } from "../services/util.service.js";

export default {
  emits: ['openDrop', 'open-drop'],
  components: {
    createBoardDrop,
    recentBoardsDrop,
    starredBoardsDrop,
    moreDrop
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
      return this.$store.getters.boardBgc
    },
    boardBgStyle() {
      if (!this.bgc) return
      return this.bgc.isLight ?
        'background-color:' + this.bgc.bgc + '; opacity: .9;'
        : 'background-color:' + this.bgc.bgc + '; opacity: .9;'
    },
    textColor() {
      if (!this.bgc) return
      return this.bgc.isLight ? 'color: #172b4d' : 'color: white'

    },
    iconColor() {
      if (!this.bgc) return 'src/assets/t-icon.png'
      return this.bgc.isLight ? 'src/assets/t-icon.png' : 'src/assets/t-icon-white.png'
    }
  },
};
</script>