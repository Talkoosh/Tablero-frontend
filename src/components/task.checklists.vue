<template>
    <section>
        <div class="checklist" v-for="checklist in checklists" :key="checklist._id">
            <h2>{{ checklist.title }}</h2>
            <checklist-todos :todos="checklist.todos"></checklist-todos>
        </div>
            <button class="add-item-button" v-if="!isAdding" @click.stop="isAdding = true">Add an item</button>
            <div class="add-item-container" v-else>
                <textarea class="todo-text"></textarea>
                <button @click="addTodo(checklist._id)" class>Add</button>
                <span class="icon stop-adding-icon"></span>
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
        
    },
    computed: {

    },
    components:{
        checklistTodos
    }
}
</script>