<template>
    <section>
        <a class="task-preview-container" href>
            <div v-if="task.cover" class="task-cover" :style="cover"></div>
            <span class="task-quick-edit">I</span>
            <div class="task-preview">
                <div class="task-labels">{{ taskLabels }}</div>
                <span>{{ task.title }}</span>
                <div class="badges"></div>
            </div>
        </a>
    </section>
</template>

<script>

export default {
    props: {
        task: Object,
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