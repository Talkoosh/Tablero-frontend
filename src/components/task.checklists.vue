<template>
    <section class="task-checklists">
        <div class="checklist" v-for="checklist in checklists" :key="checklist._id">
            <div class="checklist-header">
                <span class="icon checklist-icon"></span>
                <h2>{{ checklist.title }}</h2>
                <button
                    class="delete-checklist-btn"
                    @click.stop="deleteChecklist(checklist._id)"
                >Delete</button>
            </div>
            <checklist-todos @convert-todo="convertToCard" @checklist-updated="updateChecklist" :checklist="checklist"></checklist-todos>
        </div>
    </section>
</template>

<script>
import checklistTodos from './checklist.todos.vue'
export default {
    props: {
        checklists: Array
    },
    data() {
        return {
            isAdding: false
        }
    },
    created() {

    },
    methods: {
        updateChecklist(checklist) {
            const idx = this.checklists.findIndex(c => c._id === checklist._id);
            this.checklists.splice(idx, 1, checklist);
            this.$emit('checklists-update', this.checklists)
        },
        deleteChecklist(checklistId) {
            const idx = this.checklists.findIndex(c => c._id === checklistId);
            this.checklists.splice(idx, 1);
            this.$emit('checklists-update', this.checklists)
        },
        convertToCard(todo, checklist){
            this.$emit('convert-todo', todo, checklist)
        }
    },
    computed: {
        
    },
    components: {
        checklistTodos
    }
}
</script>