 <template>
  <div class="quick-edit-page">
    <span class="close-icon" @click="closeQuickEdit"></span>

    <div
      class="quick-edit-card-container"
      :style="taskPos"
      v-clickoutside="closeQuickEdit"
    >
      <div class="quick-edit-task">
        <div
          v-if="taskToEdit.style.photo"
          class="task-cover-img"
          :style="coverPhoto"
        ></div>
        <div
          v-if="taskToEdit.style.color"
          class="task-cover-color"
          :style="coverColor"
        ></div>
        <div class="task-details-container">
          <div class="task-labels">
            <span
              class="label"
              v-for="label in taskToEdit.labelIds"
              :key="label"
              :style="labelStyle(label)"
            ></span>
            <!-- <span class="label">-->
          </div>
          <textarea
            class="task-text"
            dir="auto"
            v-model="taskToEdit.title"
          ></textarea>
          <div class="task-badges">
            <span class="badges-container">
              <div v-if="taskToEdit.dueDate?.dueDate" class="date-badge">
                <span class="date-icon"></span>
                <span class="date">{{ taskDueDate }}</span>
              </div>
              <div v-if="taskToEdit.checklists" class="check-list-badge">
                <span class="check-list-icon"></span>
                <span class="check-list-text">{{ checklistDisplay }}</span>
              </div>
            </span>
          </div>
          <div class="task-members">
            <div class="member">
              <img
                class="member-img"
                src="@/assets/img/headerIcon.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <input
        class="save-btn"
        type="submit"
        value="Save"
        @click="saveTaskTitle"
      />

      <div class="quick-edit-options" :style="[menuPosY, menuPosX]">
        <router-link
          :to="'/board/' + boardId + '/card/' + task._id"
          class="edit-option open-card"
          :class="menuOptionPos"
          @click="closeQuickEdit"
        >
          <span class="open-card-icon icon"></span>
          <span class="edit-option-text">Open card</span>
        </router-link>

        <div
          @click="isLabelMenuOpen = true"
          class="edit-option edit-labels"
          :class="menuOptionPos"
        >
          <span class="edit-labels-icon icon"></span>
          <span class="edit-option-text">Edit labels</span>
        </div>

        <label-menu
          :style="menuStyle"
          :labels="labels"
          :task="taskToEdit"
          v-if="isLabelMenuOpen"
          @label-add="onAddLabel"
          @label-set="onSetLabel"
          @label-delete="onDeleteLabel"
          class="label-menu"
        ></label-menu>

        <div class="edit-option change-members" :class="menuOptionPos">
          <span class="change-members-icon icon"></span>
          <span class="edit-option-text">Change members</span>
        </div>

        <div
          @click="isCoverMenuOpen = true"
          class="edit-option change-cover"
          :class="menuOptionPos"
        >
          <span class="change-cover-icon icon"></span>
          <span class="edit-option-text">Change cover</span>
        </div>

        <cover-menu
          class="cover-menu"
          :style="menuStyle"
          @color-set="onSetColor"
          @photo-set="onSetPhoto"
          @cover-size-set="onSetCoverSize"
          :task="taskToEdit"
          :attachments="taskToEdit.attachments"
          v-if="isCoverMenuOpen"
        ></cover-menu>

        <div class="edit-option move" :class="menuOptionPos">
          <span class="move-icon icon"></span>
          <span class="edit-option-text">Move</span>
        </div>

        <div class="edit-option copy" :class="menuOptionPos">
          <span class="copy-icon icon"></span>
          <span class="edit-option-text">Copy</span>
        </div>

        <div
          @click="isDatesMenuOpen = true"
          class="edit-option edit-dates"
          :class="menuOptionPos"
        >
          <span class="edit-dates-icon icon"></span>
          <span class="edit-option-text">Edit dates</span>
        </div>

        <dates-menu
          @date-set="setDate"
          v-if="isDatesMenuOpen"
          :style="modalDirection"
        ></dates-menu>

        <div
          @click="archive"
          class="edit-option archive"
          :class="menuOptionPos"
        >
          <span class="archive-icon icon"></span>
          <span class="edit-option-text">Archive</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import labelMenu from "./label.menu.vue";
import coverMenu from "./cover.menu.vue";
import datesMenu from "./dates.menu.vue";
export default {
  props: {
    task: Object,
    pos: Object,
  },
  components: {
    labelMenu,
    coverMenu,
    datesMenu,
  },
  created() {
    this.taskToEdit = { ...this.task };
  },
  data() {
    return {
      taskToEdit: null,
      taskDistFromBottom: window.screen.height - this.pos.y - 382,
      menuDivSize: 550,
      isLabelMenuOpen: false,
      isCoverMenuOpen: false,
      isDatesMenuOpen: false,
      isMenuChangeDirection: false,
    };
  },
  methods: {
    closeQuickEdit() {
      this.$emit("close-quick-edit");
    },
    getLabel(labelId) {
      const board = this.$store.getters.currBoard;
      const label = board.labels.find((l) => l._id === labelId);
      return label;
    },
    async onSetLabel(labelIds) {
      try {
        this.taskToEdit.labelIds = labelIds;
        const boardId = this.$route.params.boardId;
        this.$store.dispatch({
          type: "saveTask",
          task: JSON.parse(JSON.stringify(this.taskToEdit)),
          boardId,
        });
      } catch (err) {
        console.log(err);
      }
    },
    onAddLabel(label) {
      const boardId = this.$route.params.boardId;
      this.$store.dispatch({ type: "addLabel", label, boardId });
    },
    onDeleteLabel(labelId) {
      const boardId = this.$route.params.boardId;
      this.$store.dispatch({
        type: "deleteLabel",
        labelId,
        task: { ...this.taskToEdit },
        boardId,
      });
    },
    onSetColor(color) {
      delete this.taskToEdit.style.photo;
      this.taskToEdit.style.color = color;
      const boardId = this.$route.params.boardId;
      this.$store.dispatch({
        type: "saveTask",
        task: JSON.parse(JSON.stringify(this.taskToEdit)),
        boardId,
      });
    },
    onSetCoverSize(size) {
      this.taskToEdit.style.isBackground = size === "full" ? true : false;
      const boardId = this.$route.params.boardId;
      this.$store.dispatch({
        type: "saveTask",
        task: JSON.parse(JSON.stringify(this.taskToEdit)),
        boardId,
      });
    },
    setCoverStyle(color, photo) {
      this.coverBcg = color;
      this.coverPhoto = photo;
    },
    async onSetPhoto(photo) {
      delete this.taskToEdit.style.color;
      this.taskToEdit.style.photo = photo;

      if (!photo) await this.onSetCoverSize("half");

      const boardId = this.$route.params.boardId;
      await this.$store.dispatch({
        type: "saveTask",
        task: JSON.parse(JSON.stringify(this.taskToEdit)),
        boardId,
      });
      this.coverPhoto = photo;
    },
    setDate(dueDate) {
      dueDate.dueDate = Date.parse(dueDate.dueDate.toString());
      this.taskToEdit.dueDate.dueDate = dueDate.dueDate;
      this.$store.dispatch({
        type: "setDate",
        task: JSON.parse(JSON.stringify(this.taskToEdit)),
        dueDate,
      });
    },
    async archive() {
      const boardId = this.$route.params.boardId;
      await this.$store.dispatch({
        type: "deleteTask",
        taskId: this.taskToEdit._id,
        boardId,
      });
    },
    async saveTaskTitle() {
      const boardId = this.$route.params.boardId;
      this.taskToEdit.title = this.taskToEdit.title.trim();
      this.$store.dispatch({
        type: "saveTask",
        task: JSON.parse(JSON.stringify(this.taskToEdit)),
        boardId,
      });
      this.$emit("close-quick-edit");
    },
  },
  computed: {
    coverColor() {
      return `background-color: ${this.taskToEdit.style.color}`;
    },
    coverPhoto() {
      return `background-image: url(${this.taskToEdit.style.photo});`;
    },
    menuStyle() {
      return this.isMenuChangeDirection
        ? "transform: translateY(-40%);overflow-y: auto;max-height: 400px;right: 0.4%;"
        : "transform: translateY(-40%);overflow-y: auto;max-height: 400px;margin-left:8px;";
    },
    labels() {
      return this.$store.getters.boardLabels;
    },
    boardId() {
      return this.$route.params.boardId;
    },
    labelStyle() {
      return (labelId) => {
        console.log(labelId);
        const label = this.getLabel(labelId);
        console.log(label);
        return `background-color: ${label?.color}`;
      };
    },
    checklistDisplay() {
      var totalAmount = 0;
      var doneAmount = 0;
      this.taskToEdit.checklists.forEach((c) => {
        c.todos.forEach((t) => {
          totalAmount++;
          if (t.isDone) doneAmount++;
        });
      });
      return `${doneAmount}/${totalAmount}`;
    },
    taskDueDate() {
      if (!this.taskToEdit.dueDate?.dueDate) return;

      const time = new Date(this.taskToEdit.dueDate?.dueDate);
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = monthNames[time.getMonth()];
      const day = time.getDate();
      const year = time.getFullYear();
      const now = new Date(Date.now());
      const currYear = now.getFullYear();

      if (year !== currYear) {
        return `${month} ${day}, ${year}`;
      } else {
        return `${month} ${day}`;
      }
    },
    taskPos() {
      var top = this.pos.y + this.taskDistFromBottom;
      if (this.task.style.photo) top -= 150;
      else if (this.taskToEdit.style.color) top -= 32;

      return this.taskDistFromBottom > 0
        ? `left:${this.pos.x}px;top:${this.pos.y}px`
        : `left:${this.pos.x}px;top:${top}px`;
    },
    menuPosY() {
      let taskHeight = 430;
      if (this.taskToEdit.style.color) taskHeight -= 32;
      //32 is cover color preview height
      else if (this.taskToEdit.style.photo) taskHeight -= 150; //150 is photo preview height

      let diff = window.screen.height - this.pos.y - taskHeight;
      if (this.taskDistFromBottom < 0) diff -= this.taskDistFromBottom;
      return diff < 0 ? `top:${diff}px` : "top:0px";
    },
    menuPosX() {
      //   console.log(this.taskToEdit);
      let diff = document.body.clientWidth - this.pos.x - this.menuDivSize; //340 is the menu div size
      return diff < 0 ? "left: -250px" : "left: 100%";
    },

    menuOptionPos() {
      let diff = document.body.clientWidth - this.pos.x - this.menuDivSize; //340 is the menu div size
      this.isMenuChangeDirection = diff < 0 ? true : false;
      return diff < 0 ? "left-menu" : "right-menu";
    },
    modalDirection() {
      console.log(this.isMenuChangeDirection);
      return this.isMenuChangeDirection
        ? "right: 0.4%;transform: translateY(-25%);"
        : " margin-left:8px;transform: translateY(-25%);";
    },
  },
};
</script>