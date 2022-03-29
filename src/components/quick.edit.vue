 <template>
  <div class="quick-edit-page">
    <span class="close-icon" @click="closeQuickEdit"></span>

    <div class="quick-edit-card-container" :style="taskPos">
      <div class="quick-edit-task">
        <div class="task-details-container">
          <div class="task-labels">
            <span class="label"></span>
          </div>
          <textarea
            class="task-text"
            dir="auto"
            v-model="taskToEdit.title"
          ></textarea>
          <div class="task-badges">
            <span class="badges-container">
              <div class="date-badge">
                <span class="date-icon"></span>
                <span class="date">Mar 28</span>
              </div>
              <div class="check-list-badge">
                <span class="check-list-icon"></span>
                <span class="check-list-text"></span>
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
        <!-- <div class="task"></div> -->
      </div>

      <input class="save-btn" type="submit" value="Save" />

      <div class="quick-edit-options" :style="[menuPosY,menuPosX]" >
        <div class="edit-option open-card" :class="menuOptionPos">
          <span class="open-card-icon icon"></span>
          <span class="edit-option-text">Open card</span>
        </div>

        <div class="edit-option edit-labels" :class="menuOptionPos">
          <span class="edit-labels-icon icon"></span>
          <span class="edit-option-text">Edit labels</span>
        </div>

        <div class="edit-option change-members" :class="menuOptionPos">
          <span class="change-members-icon icon"></span>
          <span class="edit-option-text">Change members</span>
        </div>

        <div class="edit-option change-cover" :class="menuOptionPos">
          <span class="change-cover-icon icon"></span>
          <span class="edit-option-text">Change cover</span>
        </div>

        <div class="edit-option move" :class="menuOptionPos">
          <span class="move-icon icon"></span>
          <span class="edit-option-text">Move</span>
        </div>

        <div class="edit-option copy" :class="menuOptionPos">
          <span class="copy-icon icon"></span>
          <span class="edit-option-text">Copy</span>
        </div>

        <div class="edit-option edit-dates" :class="menuOptionPos">
          <span class="edit-dates-icon icon"></span>
          <span class="edit-option-text">Edit dates</span>
        </div>

        <div class="edit-option archive" :class="menuOptionPos">
          <span class="archive-icon icon"></span>
          <span class="edit-option-text">Archive</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import '' from ''
export default {
  props: {
    task: Object,
    pos: Object,
  },
  components: {},
  created() {
    console.log('window-width',document.body.clientWidth);
    console.log('x',this.pos.x);
    this.taskToEdit = { ...this.task };
  },
  data() {
    return {
      taskToEdit: null,
      taskDistFromBottom : window.screen.height -this.pos.y -382,
    };
  },
  methods: {
    closeQuickEdit() {
      this.$emit("close-quick-edit");
    },
  },
  computed: {
    taskPos() {
      const diff = window.screen.height - this.pos.y - 382;
      var top = this.pos.y + diff;
    //   console.log(diff);
    //   console.log("top", top);
      return (diff > 0)
        ? `left:${this.pos.x}px;top:${this.pos.y}px`
        : `left:${this.pos.x}px;top:${top}px`;
    },
    menuPosY() {
      let diff = window.screen.height - this.pos.y - 430;
    //   console.log('diffBefore',diff);
      if(this.taskDistFromBottom<0) diff -= (this.taskDistFromBottom);
    //   console.log('diffAfter',diff);
      return (diff < 0) ? `top:${diff}px` : "top:0px";
    },
    menuPosX(){
        let diff = document.body.clientWidth -this.pos.x -340;
        return (diff<0) ? 'left: -250px' : 'left: 100%';
    },

    menuOptionPos(){

        console.log('hey');
        let diff = document.body.clientWidth -this.pos.x -340;
        console.log('diff',diff);
        return (diff<0) ? 'left-menu' : 'right-menu'

    }
    
  },
};
</script>