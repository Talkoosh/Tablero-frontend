<template>
  <section>
    <div class="main-task-container">
      <router-link class="task-preview-container" :to="'/board/' + boardId + '/card/' + task._id">
        <div
          v-if="
            (task.style.color && !task.style.isBackground) ||
            (task.style.photo && !task.style.isBackground)
          "
          class="task-cover"
          :style="cover"
        ></div>
        <!-- <div v-if="task.style.photo" class="task-photo"></div> -->
        <div class="task-preview" :class="taskCover" :style="taskBg">
          <div class="task-labels" v-if="!task.style.isBackground">
            <label-preview v-for="label in task.labelIds" :label="label" :key="label" />
          </div>
          <div v-if="task.style.photo && task.style.isBackground" class="text-shadowing"></div>
          <span class="task-title" :class="isBackgroundImage">{{ task.title }}</span>
          <badge-preview :task="task" class="task-badges" />
          <span @click.prevent="openQuickEdit" class="task-quick-edit" ref="quickEditBtn"></span>
        </div>
      </router-link>
      <quickEdit
        :task="task"
        :pos="quickEditPos"
        v-if="isQuickEditOpen"
        @open-quick-edit="openQuickEdit"
        @close-quick-edit="closeQuickEdit"
      />
    </div>
  </section>
</template>

<script>
import labelPreview from "./label.preview.vue";
import badgePreview from "./badge.preview.vue";
import quickEdit from "./quick.edit.vue"
export default {
  props: {
    task: Object,
    boardId: String,
  },
  components: {
    labelPreview,
    badgePreview,
    quickEdit,
  },
  created() { },
  data() {
    return {
      isQuickEditOpen: false,
      quickEditPos: null,
    };
  },
  methods: {
    openQuickEdit() {
      // console.log(event.clientY);
      // this.$refs.quickEditBtn.getBoundingClientRect().x = 0;
      // console.log(this.$refs.quickEditBtn.getBoundingClientRect().x);
      const y = this.$refs.quickEditBtn.getBoundingClientRect().top;
      const x = this.$refs.quickEditBtn.getBoundingClientRect().right - 256;
      this.quickEditPos = { x, y };
      this.isQuickEditOpen = true;
    },
    closeQuickEdit() {
      this.isQuickEditOpen = false;
    },
  },
  computed: {
    labelStyle(label) {
      console.log(label);
    },
    isBackgroundImage() {
      return (this.task.style.photo && this.task.style.isBackground) ? 'text-bold' : ''
    },
    cover() {
      if (this.task.style.color) {
        return `background-color: ${this.task.style.color}; height: 34px`;
      }
      if (this.task.style.photo) {
        return `background-image: url('${this.task.style.photo}'); min-height: 260px; background-size: cover`;
      }
    },
    taskCover() {
      if (
        !this.task.style.isBackground ||
        (!this.task.style.photo && !this.task.style.color)
      )
        return "";
      else return "task-bg-cover";
    },
    taskBg() {
      if (!this.task.style.isBackground) return;
      if (this.task.style.photo)
        return `background-image: url('${this.task.style.photo}'); height: 260px;display:flex;`;
      else if (this.task.style.color)
        return `background-color: ${this.task.style.color}; min-height: 56px;display:flex;`;
    },
  },
  unmounted() { },
};
</script>