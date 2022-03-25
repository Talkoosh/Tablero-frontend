<template>
  <section class="main-header">
    <router-link class="main-logo" :to="'/board/'">Tablero</router-link>
    <div class="left-navbar">
      <div class="main-header-dropdowns">
        <div class="recent-drop">
          <button class="drop-btn recent-btn" @click="toggleRecentDrop">
            Recent
          </button>
          <div
            class="recent-drop-content dropdown"
            v-if="isRecentDropOpen"
            v-clickoutside="toggleRecentDrop"
            
          >
            <header class="drop-header">
                <div class="header-text">Recent boards</div>
                <button class="close-header" @click="toggleRecentDrop">X</button>
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
          <button class="drop-btn starred-btn" @click="toggleStarredDrop">
            Starred
          </button>
          <div
            class="starred-drop-content dropdown"
            v-if="isStarredDropOpen"
            v-clickoutside="toggleStarredDrop"
          >
            <header class="drop-header">
                <div class="header-text">Starred boards</div>
                <button @click="toggleStarredDrop" class="close-header">X</button>
            </header>
            <div class="boards-list" v-for="board in boards" :key="board._id">
              <div class="board-details">
                <div class="board-img-container">
                  <!-- <img src="" alt="" /> -->
                </div>
                <div class="borad-text">
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
      </div>
      
      <div class="create-board">
        <div class="create-board-btn-container">
        <button class="create-board-btn drop-btn" @click="toggleCreateBoard">
          Create
        </button>
        </div>
        <div v-clickoutside="toggleCreateBoard" v-if="isCreateBoardOpen" class="create-board-modal" :class="toggleCreateBoardModal">
          <header class="modal-header">
            <div class="modal-title">Create board</div>
            <button class="close-create-modal-btn" @click="toggleCreateBoard">X</button>
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
              <input type="text" class="create-board-input" 
              v-model="boardToAdd.title">
            </div>

            <button class="submit-create-btn" :class="submitStatus">Create</button>


          </div>
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
        <img src="@/assets/img/headerIcon.png" class="main-header-icon-img" />
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
      boardToAdd : {title:'', style:{}},
      isRecentDropOpen: false,
      isStarredDropOpen: false,
      isCreateBoardOpen: false,
      isTypingBoardName : false,
      
    };
  },
  methods: {
    toggleRecentDrop() {
      this.isRecentDropOpen = !this.isRecentDropOpen;
    },
    toggleStarredDrop() {
      this.isStarredDropOpen = !this.isStarredDropOpen;
    },
    toggleCreateBoard(){
      this.isCreateBoardOpen = !this.isCreateBoardOpen;
    },
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
    submitStatus(){
      return this.boardToAdd.title ? "submit-possible" : "submit-unpossible"
    },
   
  },
};
</script>