<template>
  <section class="main-header" :style="boardBgStyle">
    <router-link :style="textColor" class="main-logo" :to="'/board/'">
      <img :src="iconColor" class="logo-icon" />
      <span class="logo-text">Tablero</span>
    </router-link>
    <div class="left-navbar">
      <div class="main-header-dropdowns">
        <div class="more-drop">
          <button :style="textColor" class="drop-btn more-btn" @click="openDropdown('moreDrop')">
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
        <span class="magnifing-glass" role="img" aria-label="SearchIcon">
          <svg
            width="20"
            height="20"
            role="presentation"
            focusable="false"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5C18 12.2269 17.4164 13.8175 16.4356 15.0852L20.3769 19.0953C20.764 19.4892 20.7586 20.1223 20.3647 20.5095C19.9708 20.8966 19.3376 20.8911 18.9505 20.4972L15.0129 16.4909C13.7572 17.4383 12.1942 18 10.5 18ZM16 10.5C16 13.5376 13.5376 16 10.5 16C7.46243 16 5 13.5376 5 10.5C5 7.46243 7.46243 5 10.5 5C13.5376 5 16 7.46243 16 10.5Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <input class="main-input" :style="textColor" type="text" placeholder="Search" />
      </div>
      <div class="right-nav-btn">
        <span class="little-search" role="img" aria-label="SearchIcon">
          <svg
            class="magnifying-glass"
            width="20"
            height="20"
            role="presentation"
            focusable="false"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5C18 12.2269 17.4164 13.8175 16.4356 15.0852L20.3769 19.0953C20.764 19.4892 20.7586 20.1223 20.3647 20.5095C19.9708 20.8966 19.3376 20.8911 18.9505 20.4972L15.0129 16.4909C13.7572 17.4383 12.1942 18 10.5 18ZM16 10.5C16 13.5376 13.5376 16 10.5 16C7.46243 16 5 13.5376 5 10.5C5 7.46243 7.46243 5 10.5 5C13.5376 5 16 7.46243 16 10.5Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </div>

      <div @click="openDropdown('acountDrop')" class="main-header-icon">
        <!-- <img src="@/assets/img/headerIcon.png" class="main-header-icon-img" /> -->
        <avatar-profile class="member-pic" :imgURL="userImg" :username="userName" ></avatar-profile>
      </div>
    </div>
  </section>
</template>

<script>
import createBoardDrop from "./create.board.drop.vue";
import recentBoardsDrop from "./recent.boards.drop.vue";
import starredBoardsDrop from "./starred.boards.drop.vue";
import moreDrop from "./more.drop.vue";
import avatarProfile from "./avatar.profile.vue";
import { utilService } from "../services/util.service.js";

export default {
  emits: ["openDrop", "open-drop"],
  components: {
    createBoardDrop,
    recentBoardsDrop,
    starredBoardsDrop,
    moreDrop,
    avatarProfile,
  },
  created() { },
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
      return;
    },
    isCreateBoardOpen() {
      return;
    },
    bgc() {
      return this.$store.getters.boardBgc;
    },
    boardBgStyle() {
      if (!this.bgc) return;
      return this.bgc.isLight
        ? "background-color:" + this.bgc.bgc + "; opacity: .9;"
        : "background-color:" + this.bgc.bgc + "; opacity: .9;";
    },
    textColor() {
      if (!this.bgc) return;
      return this.bgc.isLight ? "color: #172b4d" : "color: white";
    },
    iconColor() {
      // if (!this.bgc) return "../assets/img/logowhite.png";
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAuQAAAHoCAMAAAA2UAqxAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAgVBMVEUAAAAXK00pmtoomtkpmdkymtUnlNIumNMvmNIymdMqk8wuk8sljsgqk80ijcgvls8jjcg2lco3l8wtlM0qkcouksk2mdAijMYrk8wkjccrkss5lso4lckxls4rkck3lcovksgskMcrkMcvk8ozl84zls4yls0skMg0l843mc/////8JFksAAAAAXRSTlMAQObYZgAAAAFiS0dEKlO+1J4AAAAHdElNRQfmBAEQIAG/UCTeAAAAAW9yTlQBz6J3mgAADdhJREFUeNrt0seSJMgRA1EutdZac6n//wd5IM24uruiZ9bhBbxzHhIIfOUrMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzT+GDAdBXL0Kfuht9/Qb0jWc7f8/o887/0EN4XvRl5yPoMTwn+qrzcfQenhB90vk0ehPPhr7nfBZ6FU+FPuZ8HnoZz4O+5Hw+ehvPgr7jfBF6Hc+BvuJ8MXofz4C+4byEXogffcF5Gb0RO/p+8xr0Stzo683r0Dsxo283r0UvRYw+3bwaPRUt+nDzevRWrOi7zSPotUjRZ5uH0HNRoo82j6H3YkTfbB5FL0aIPtk8il6MD32xeRy9GR36YPM4ejM69MHmcfRmbOh7zQW9Ghn6XHNBr0aGPtec0LNRoY81N/RuVOhjzQ29GxX6WHND78aEvtUc0cMxoW81V/RyROhTzRW9HBH6VHNFL0eEPtVc0csRoU81V/RyPOhLzR29HQ36UHNHb0eDPtTc0dvRoA81d/R2NOhDzR29HQ36UHNHb0eDPtTc0dvRoA81d/R2NOhDzR29HQ36UHNHb0eDPtTc0dvRoA81d/R2NOhDzR29HQ36UHNHb0eDPtTc0dvRoA81d/R2NOhDzR29HQ1Z6frVyL77HIR9awduLl3N2bZ54eLaraRduycuLl5JW7V84+LmfbxNyzdurt5GXLR84+ruXcw9yzfuLt9EXbN84/L2Pdwtyzdur9/CXbJ94/b+JeQlb+TzMnvH+pHY/29g73gjnxfZK9aPXH8BAX3FCzAv0Ve8APMSfcULMC/RN+zfiD5APH/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdBOn/DtQFyEqTzN1wbICdB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"
    },
    userName() {
      return this.$store.getters.loggedinUser?.username;
    },
    userImg(){
      return this.$store.getters.loggedinUser?.imgUrl
    }
  },
};
</script>