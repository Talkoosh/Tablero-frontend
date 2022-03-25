<template>
    <section>
        <div class="group-container">
            <div class="group">
                <div class="group-header">
                    <h2
                        @click="toggleEditGroupTitle"
                        v-if="!isEditGroupTitle"
                        class="group-title"
                    >{{ group.title }}</h2>
                    <input
                        v-clickoutside="saveGroupTitle"
                        @keyup.enter="saveGroupTitle"
                        v-else
                        ref="editGroupTitle"
                        type="text"
                        v-model="groupToEdit.title"
                    />
                    <div class="group-extras">
                        <div>...</div>
                    </div>
                </div>
                <div class="group-tasks">
                    <task-preview
                        v-for="task in group.tasks"
                        :key="task._id"
                        :task="task"
                        :boardId="boardId"
                    />
                </div>
                <div class="add-task" :class="addTaskCondition">
                    <div @click="toggleAddTask" v-if="!isAddTask" class="add-task-unactive">
                        <span>+</span>
                        Add a card
                    </div>
                    <div v-clickoutside="toggleAddTask" class="add-task-active" v-else>
                        <div class="textarea-container">
                            <textarea
                                v-model="taskToAdd.title"
                                ref="addTask"
                                placeholder="Enter a title for this card..."
                            />
                        </div>
                        <div class="add-task-btns">
                            <button @mouseup="addTask" class="add-task-btn">Add Card</button>
                            <button @click="isAddTask = false" class="cancel-add-task-btn">
                                <span class="x-icon"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import taskPreview from "./task.preview.vue"
export default {
    props: {
        group: Object,
        boardId: String,
    },
    components: {
        taskPreview,
    },
    created() { },
    data() {
        return {
            isAddTask: false,
            isEditGroupTitle: false,
            taskToAdd: {
                title: '',
                groupId: this.group._id
            },
        }
    },
    methods: {
        toggleAddTask() {
            this.isAddTask = !this.isAddTask;
        },
        async addTask() {
            if (!this.taskToAdd.title) return
            const a = await this.$emit('task-added', this.taskToAdd)
            console.log(a)
            this.taskToAdd = {
                title: '',
                groupId: this.group._id
            }
        },
        toggleEditGroupTitle() {
            this.isEditGroupTitle = !this.isEditGroupTitle;
            if (this.isEditGroupTitle) {
                setTimeout(() => {
                    this.$refs.editGroupTitle.focus();
                }, 100)
            }
        },
        saveGroupTitle() {
            this.$emit('group-title-changed', this.groupToEdit)
            this.isEditGroupTitle = !this.isEditGroupTitle;
        },
    },
    computed: {
        addTaskCondition() {
            return this.isAddTask ? 'add-task-active' : '';
        },
        groupToEdit() {
            const group = { ...this.group }
            return group
        }
    }
}
</script>