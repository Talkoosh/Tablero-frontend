<template>
    <section>
        <div class="main-task-container">
            <router-link
                class="task-preview-container"
                :to="'/board/' + boardId + '/card/' + task._id"
            >
                <div v-if="task.style" class="task-cover" :style="cover"></div>
                <div class="task-preview" :style="taskCover">
                    <div class="task-labels">
                        <label-preview v-for="label in task.labelIds" :label="label" :key="label" />
                    </div>
                    <span>{{ task.title }}</span>
                    <div v-if="task.badges" class="task-badges"></div>
                    <div v-if="task.members" class="task-members"></div>
                    <span @click.prevent="openQuickEdit" class="task-quick-edit"></span>
                </div>
            </router-link>
        </div>
    </section>
</template>

<script>
import labelPreview from "./label.preview.vue"
export default {
    props: {
        task: Object,
        boardId: String,
    },
    components: {
        labelPreview,
    },
    created() { },
    data() {
        return {}
    },
    methods: {},
    computed: {
        labelStyle(label) {
            console.log(label)
        },
        cover() {
            if (this.task.style.color) {
                return `background-color: ${this.task.style.color}; height: 34px`
            }
            if (this.task.style.photo) {
                return `background-image: url('${this.task.style.photo}'); min-height: 260px; background-size: cover`
            }
        },
        taskCover() {
            return
        }
    },
    unmounted() { },
}
</script>