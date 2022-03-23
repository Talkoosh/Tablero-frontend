<template>
  <section class="main-header">
    <div class="main-logo">Tablero</div>
    <div class="left-navbar">
      <div class="main-header-dropdowns">
        <div class="workspace-drop">
          <button
            class="drop-btn workspace-btn"
            @click="toggleWorkspaceDrop"
          >
            Workspaces
          </button>
          <div
            class="workspace-drop-content dropdown"
            :class="toggleWorkspaceDropdown"
          >
            <header class="drop-header">
              <div class="drop-header">Workspaces</div>
              <button>X</button>
            </header>
            <div class="boards-list" v-for="board in boards" :key="board._id">
              <div class="board-details">
                <div class="board-img-container">
                  <img src="" alt="" />
                </div>
                <div class="board-text">
                  <div>{{ board.title }}</div>
                  <div>{{ board.createdBy.fullname }} workspace</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="recent-drop">
          <button class="drop-btn recent-btn" @click="toggleRecentDrop">
            Recent
          </button>
          <div
            class="recent-drop-content dropdown"
            :class="toggleRecentDropdown"
          >
            <header class="drop-header">
              <div class="drop-header">Recent boards</div>
              <button>X</button>
            </header>
            <div class="boards-list" v-for="board in boards" :key="board._id">
              <div class="board-details">
                <div class="board-img-container">
                  <img src="" alt="" />
                </div>
                <div class="board-text">
                  <div>{{ board.title }}</div>
                  <div>{{ board.createdBy.fullname }} workspace</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="starred-drop">
          <button
            class="drop-btn starred-btn"
            @click="toggleStarredDrop"
          >
            Starred
          </button>
          <div
            class="starred-drop-content dropdown"
            :class="toggleStarredDropdown"
          >
            <header class="drop-header">
              <div class="drop-header">Starred boards</div>
              <button>X</button>
            </header>
            <div class="boards-list" v-for="board in boards" :key="board._id">
              <div class="board-details">
                <div class="board-img-container">
                  <img src="" alt="" />
                </div>
                <div class="corad-text">
                  <div>{{ board.title }}</div>
                  <div>{{ board.createdBy.fullname }} workspace</div>
                </div>
                <div class="star-container">
                  <span>🎁</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="templates-drop">
          <button class="drop-btn" >Templates</button>
            <div class="templatese-drop-content">
                <header>
                    <div class="drop-header">Templates</div>
                    <button>X</button>
                </header>
                <li v-for="board in boards" :key="board._id">

                </li>
            </div>
       </div> -->
      </div>
      <button class="create-board-btn drop-btn">Create</button>
      <div class="seperator"></div>
    </div>
    <div class="right-navbar">
      <div class="board-search">
        <!-- <form class="search-container" action=""> -->
        <input class="main-input" type="text" placeholder="Search" />
        <!-- </form> -->
      </div>
      <button class="right-nav-btn">
        <span>i</span>
      </button>
      <button class="right-nav-btn">
        <span>💡</span>
      </button>
      <div>
        <span>icon</span>
      </div>
    </div>
  </section>
</template>

<script>
// import '' from ''
export default {
  name: "",
  components: {},
  created() {},
  data() {
    return {
      isRecentDropOpen: false,
      isStarredDropOpen: false,
      isWorkspaceDropOpen: false,
    };
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
    toggleWorkspaceDrop() {
      this.isWorkspaceDropOpen = !this.isWorkspaceDropOpen;
    },
    toggleRecentDrop() {
      this.isWorkspaceDropOpen = !this.isWorkspaceDropOpen;
    },
    toggleStarredDrop() {
      this.isStarredDropOpen = !this.isStarredDropOpen;
    },
  },
  methods: {
    toggleWorkspaceDropdown() {
      //   if (key === "workspace") {
      this.isRecentDropOpen = false;
      this.isStarredDropOpen = false;
      return this.isWorkspaceDropOpen ? 'open-drop' : 'close-drop';
    },
    toggleStarredDropdown() {
      //   } else if (key === "starred") {
      this.isRecentDropOpen = false;
      this.isWorkspaceDropOpen = false;
      return this.isStarredDropOpen ? 'open-drop' : 'close-drop';
    },
    toggleRecentDropdown() {
      //   } else if (key === "recent") {
      this.isStarredDropOpen = false;
      this.isWorkspaceDropOpen = false;
      return this.isRecentDropOpen ? 'open-drop' : 'close-drop';
    },
  },
};
</script>