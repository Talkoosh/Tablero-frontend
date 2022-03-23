<template>
    <section>
        <div class="group">
            <div class="group-header">
                <h2 class="group-title">{{ group.title }}</h2>
                <div class="group-extras">...</div>
            </div>
            <task-preview v-for="task in group.tasks" :key="task._id" :task="task" />
            <div class="add-group">
                <span>+ Add another list</span>
                <!-- <input type="text" v-model="grouToAdd.title" placeholder="Enter list title..." /> -->
                <button @click="addGroup" class="add-group-btn">Add list</button>
                <button @click="isAddList = false" class="cancel-add-group-btn">X</button>
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