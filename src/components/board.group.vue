<template>
    <section>
        <div class="group">
            <div class="group-header">
                <h2 class="group-title">{{ group.title }}</h2>
                <div class="group-extras">...</div>
            </div>
            <task-preview v-for="task in group.tasks" :key="task._id" :task="task" />
            <div class="add-task">
                <span>+</span> Add a card
            </div>
        </div>
    </section>
</template>

<script>
import taskPreview from "./task.preview.vue"
export default {
    props: {
        group: Object,
    },
    components: {
        taskPreview,
    },
    created() { },
    data() {
        return {}
    },
    methods: {},
    computed: {},
    unmounted() { },
}
</script>