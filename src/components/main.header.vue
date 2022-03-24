<template>
  <section class="main-header">
    <router-link class="main-logo" :to="'/board/'">Tablero</router-link>
    <div class="left-navbar">
      <div class="main-header-dropdowns">
        <!-- <div class="workspace-drop">
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
          <header class="drop-padding">
            <div class="drop-header">
              <div class="header-text">Workspaces</div>
              <span class="close-header" @click="toggleWorkspaceDrop">X</span>
            </div>
            </header>
            <div class="boards-list" v-for="board in boards" :key="board._id">
              <div class="board-details">
                <div class="board-img-container"> -->
                  <!-- <img src="" alt="" /> -->
                <!-- </div>
                <div class="board-text">
                  <div>{{ board.title }}</div>
                  <div>{{ board.createdBy.fullname }} workspace</div>
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <div class="recent-drop">
          <button class="drop-btn recent-btn" @click="toggleRecentDrop">
            Recent
          </button>
          <div
            class="recent-drop-content dropdown"
            :class="toggleRecentDropdown"
          >
          <header class="drop-padding">
            <div class="drop-header">
              <div class="header-text">Recent boards</div>
              <span class="close-header" @click="toggleRecentDrop">X</span>
            </div>
            </header>
            <div class="boards-list" v-for="board in boards" :key="board._id">
              <div class="board-details">
                <div class="board-img-container">
                  <!-- <img src="" alt="" /> -->
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
            <header class="drop-padding">
            <div class="drop-header">
              <div class="header-text">Starred boards</div>
              <span @click="toggleStarredDrop" class="close-header">X</span>
            </div>
            </header>
            <div class="boards-list" v-for="board in boards" :key="board._id">
              <div class="board-details">
                <div class="board-img-container">
                  <!-- <img src="" alt="" /> -->
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
      <div class="create-board">
         <button class="create-board-btn drop-btn" @click="toggleCreateBoard">Create</button>
         <div class="create-board-modal">
           <header class="modal-header">
             <div class="modal-title">Create board</div>
             <button class="close-create-modal-btn">X</button>
           </header>
           <div class="modal-content"></div>
         </div>
      </div>
      <div class="seperator"></div>
    </div>
    <div class="right-navbar">
      <div class="board-search">
        <!-- <form class="search-container" action=""> -->
        <input class="main-input" type="text" placeholder="Search" />
        <!-- </form> -->
      </div>
      <button class="right-nav-btn">
        <span>💡</span>
      </button>
      <div class="main-header-icon">
        <img src="@/assets/img/headerIcon.png" class="main-header-icon-img"/>
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
  methods: {
   
    // toggleWorkspaceDrop() {
    //   this.isWorkspaceDropOpen = !this.isWorkspaceDropOpen;
    // },
    toggleRecentDrop() {
      this.isRecentDropOpen = !this.isRecentDropOpen;
    },
    toggleStarredDrop() {
      this.isStarredDropOpen = !this.isStarredDropOpen;
    },
  },
  computed: {
       boards() {
      return this.$store.getters.boards;
    },
    // toggleWorkspaceDropdown() {
    //   this.isRecentDropOpen = false;
    //   this.isStarredDropOpen = false;
    //   return this.isWorkspaceDropOpen ? 'open-drop' : 'close-drop';
    // },
    toggleStarredDropdown() {
      this.isRecentDropOpen = false;
      this.isWorkspaceDropOpen = false;
      return this.isStarredDropOpen ? 'open-drop' : 'close-drop';
    },
    toggleRecentDropdown() {
      this.isStarredDropOpen = false;
      this.isWorkspaceDropOpen = false;
      return this.isRecentDropOpen ? 'open-drop' : 'close-drop';
    },
  },
};
</script>