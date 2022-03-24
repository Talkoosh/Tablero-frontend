<template>
    <section>
        <router-link class="task-preview-container" :to="'/board/' + boardId + '/card/' + task._id">
            <div v-if="task.cover" class="task-cover" :style="cover"></div>
            <div class="task-preview">
                <div class="task-labels">
                    <label-preview v-for="label in task.labelIds" :label="label" :key="label" />
                </div>
                <span>{{ task.title }}</span>
                <div v-if="task.badges" class="task-badges"></div>
                <div v-if="task.members" class="task-members"></div>
                <span @click.prevent="openQuickEdit" class="task-quick-edit"></span>
            </div>
        </router-link>
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
    },
    unmounted() { },
}
</script>