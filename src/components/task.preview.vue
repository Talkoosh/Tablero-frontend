<template>
    <section>
        <router-link class="task-preview-container" :to="'/board/' + boardId + '/card/' + task._id">
            <div v-if="task.cover" class="task-cover" :style="cover"></div>
            <div class="task-preview">
                <div class="task-labels">{{ taskLabels }}</div>
                <span>{{ task.title }}</span>
                <div v-if="task.badges" class="task-badges"></div>
                <div v-if="task.members" class="task-members"></div>
                <span class="icon task-quick-edit"></span>
            </div>
        </router-link>
    </section>
</template>

<script>

export default {
    props: {
        task: Object,
        boardId: String,
    },
    components: {},
    created() { },
    data() {
        return {}
    },
    methods: {},
    computed: {
        taskLabels() {
            return this.task.labels
        },
    },
    unmounted() { },
}
</script>