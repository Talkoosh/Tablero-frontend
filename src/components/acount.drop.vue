 <template>
  <div class="acount-drop-content">
    <header class="drop-header">
      <div class="header-text">Account</div>
      <span class="close-header" @click="closeDropdown()"></span>
    </header>
    <div class="options-list">
      <ul class="list-container">
        <div class="user-details-container">
          <div class="user-img">
            <div class="img-container">
              <avatar-profile class="member-pic" :username="userName" :imgURL="userImg"></avatar-profile>
            </div>
          </div>
          <div class="user-details">
            <div class="user-name">{{ loggedinUser?.username || "Guest" }}</div>
            <span class="user-email">{{ loggedinUser?.email || "guest" }}</span>
          </div>
        </div>

        <!-- <li class="first-option option">
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
        </li>-->
        <hr />

        <li @click="logout" class="logout-option">
          <button class="logout-btn">
            <span class="logout">Log out</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import avatarProfile from './avatar.profile.vue'

export default {
  name: "",
  components: {
    avatarProfile
  },
  created() { },
  data() {
    return {};
  },
  methods: {
    closeDropdown(cmpName) {
      this.$emit("close-drop", cmpName);
    },
    logout() {
      this.$store.dispatch({ type: "logout" });
      this.closeDropdown();
      this.$router.push("/");
    },
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    userName() {
      return this.$store.getters.loggedinUser?.username;
    },
    userImg() {
      return this.$store.getters.loggedinUser?.imgUrl
    }
  },
};
</script>

