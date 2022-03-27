 
 <template>
  <div class="create-board">
    <div class="create-board-modal" :class="toggleCreateBoardModal">
      <header class="modal-header">
        <div class="modal-title">Create board</div>
        <button class="close-create-modal-btn" @click="closeDropdown">X</button>
      </header>
      <div class="modal-content">
        <div class="background-display">
          <div class="img-container" :style="coverBG">
            <img
              class="cover-img"
              src="@/assets/img/create-board-display.svg"
              alt=""
            />
          </div>
        </div>

        <div class="background-picker-container">
          <label class="covers-title" for="background-picker-title"
            >Background</label
          >
          <div class="background-options">
            <ul class="background-imgs-options">
              <li
                class="background-img"
                v-for="img in imgs"
                :key="img"
                @click="changeBGP(img)"
              >

                <button class="img" :style="'background-image: url('+img+')'">
                  <span v-if="cardBGP(img)" class="check-photo-container">
                    <span class="checked-photo">
                      <span class="check-icon"></span>
                    </span>
                  </span>
                </button>
                <!-- <img :src="img" alt="" /> -->
              </li>
            </ul>
            <ul class="background-colors-options">
              <li class="color-card">
                <button @click="changeBGC('#0079bf')" class="color1">
                  <span v-if="cardBGC('#0079bf')" class="check-container">
                    <span class="checked-color">
                      <span class="check-icon"></span>
                    </span>
                  </span>
                </button>
              </li>
              <li class="color-card">
                <button @click="changeBGC('#d29034')" class="color2">
                  <span v-if="cardBGC('#d29034')" class="check-container">
                    <span class="checked-color">
                      <span class="check-icon"></span>
                    </span>
                  </span>
                </button>
              </li>
              <li class="color-card">
                <button @click="changeBGC('#519839')" class="color3">
                  <span v-if="cardBGC('#519839')" class="check-container">
                    <span class="checked-color">
                      <span class="check-icon"></span>
                    </span>
                  </span>
                </button>
              </li>
              <li class="color-card">
                <button @click="changeBGC('#b04632')" class="color4">
                  <span v-if="cardBGC('#b04632')" class="check-container">
                    <span class="checked-color">
                      <span class="check-icon"></span>
                    </span>
                  </span>
                </button>
              </li>
              <li class="color-card">
                <button @click="changeBGC('#89609e')" class="color5">
                  <span v-if="cardBGC('#89609e')" class="check-container">
                    <span class="checked-color">
                      <span class="check-icon"></span>
                    </span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div class="create-board-input-container">
          <div class="input-title">Board title</div>
          <input
            type="text"
            class="create-board-input"
            v-model="boardToAdd.title"
          />
        </div>

        <button
          class="submit-create-btn"
          :class="submitStatus"
          @click="addBoard"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { photoService } from "../services/photo.service.js";
export default {
  name: "",
  components: {},
  async created() {
    let photos = await photoService.loadDefaultPhotos();
    this.imgs = photos.slice(0, 4);
  },
  data() {
    return {
      boardToAdd: {
        title: "",
        style: {
          backgroundColor: "#0079bf",
        },
      },
      imgs: [],
    };
  },
  methods: {
    async addBoard() {
      if (!this.boardToAdd.title) return;
      this.$emit("close-drop");
      await this.$store.dispatch({
        type: "addBoard",
        boardToAdd: this.boardToAdd,
      });
    },

   

    closeDropdown() {
      this.$emit("close-drop");
    },
    changeBGC(color) {
      delete this.boardToAdd.style.photo;
      this.boardToAdd.style.backgroundColor = color;
    },
    changeBGP(url) {
      delete this.boardToAdd.style.backgroundColor;
      this.boardToAdd.style.photo = url;
    },
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },

    submitStatus() {
      return this.boardToAdd.title ? "submit-possible" : "submit-unpossible";
    },

    coverBG() {
      if (this.boardToAdd.style.photo)
        return `background-image: url(${this.boardToAdd.style.photo})`;
      return `background-color : ${this.boardToAdd.style.backgroundColor}`;
      // this.boardToAdd.style.backgroundColor
      //   ? `background-color : ${this.boardToAdd.style.backgroundColor}`
      //   : "background-color : #0079bf";
    },
    cardBGC() {
      return (color) => {
        return this.boardToAdd.style.backgroundColor === color;
      };
    },
    cardBGP() {
      return (photoUrl) => {
        return this.boardToAdd.style.photo === photoUrl;
      };
    },
  },
};
</script>