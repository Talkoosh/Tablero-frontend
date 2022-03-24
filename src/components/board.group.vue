<template>
    <section>
        <div class="group-container">
            <div class="group">
                <div class="group-header">
                    <h2 class="group-title">{{ group.title }}</h2>
                    <div class="group-extras">
                        <div>...</div>
                    </div>
                </div>
                <task-preview
                    v-for="task in group.tasks"
                    :key="task._id"
                    :task="task"
                    :boardId="boardId"
                />
                <div class="add-task" :class="addTaskCondition">
                    <div @click="toggleAddTask" v-if="!isAddTask" class="add-task-unactive">
                        <span>+</span>
                        Add a card
                    </div>
                    <div class="add-task-active" v-else>
                        <div class="textarea-container">
                            <textarea
                                v-model="taskToAdd.title"
                                @blur="toggleAddTask"
                                ref="addTask"
                                placeholder="Enter a title for this card..."
                            />
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
            isAddTask: true,
            taskToAdd: { title: '' }
        }
    },
    methods: {
        toggleAddTask() {
            if (this.isAddTask) {
                setTimeout(() => {
                    this.isAddTask = false
                }, 100)
            } else {
                this.isAddTask = true
                setTimeout(() => {
                    this.$refs.addTask.focus();
                }, 100)
            }
        }
    },
    computed: {
        addTaskCondition() {
            return this.isAddTask ? 'add-task-active' : '';
        }
    },
    unmounted() { },
}
</script>