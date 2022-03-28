 <template>
  <div class="acount-drop-content ">
    <header class="drop-header">
      <div class="header-text">Acount</div>
      <button class="close-header" @click="closeDropdown()">
        X
      </button>
    </header>
    <div class="options-list" >
        <ul class="list-container">
            <div class="user-details-container">
                <div class="user-img">
                    <div class="img-container">
                        <img src="@/assets/img/headerIcon.png" alt="" class="img">
                    </div>
                </div>
                <div class="user-details">
                    <div class="user-name"></div>
                    <span class="user-email"></span>
                </div>
            </div>

            <li class="first-option option">
                <div class="option-wrapper">
                    <span class="option-text">Profile and visibilty</span>
                </div>
            </li>
            <li class="option">
                <div class="option-wrapper">
                    <span class="option-text">Activity</span>
                </div>
            </li>
            <li class="option">
                <div class="option-wrapper">
                    <span class="option-text">Cards</span>
                </div>
            </li>
            <li class="last-option option">
                <div class="option-wrapper">
                    <span class="option-text">Settings</span>
                </div>
            </li>

            <li class="logout-option">
                <button class="logout-btn">
                    <span class="logout">Log out</span>
                </button>
            </li>
        </ul>
      
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