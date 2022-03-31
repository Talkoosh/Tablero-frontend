<template>
    <section>
        <el-progress :percentage="todoPercentage" :status="progressColor" class="progress-bar"></el-progress>
        <ul>
            <li class="todo" v-for="todo in checklist.todos" :key="todo._id">
                <div class="todo-text-container">
                    <input
                        class="is-done-btn"
                        type="checkbox"
                        @change="updateChecklist"
                        v-model="todo.isDone"
                    />
                    <p :style="todo.isDone ? 'text-decoration: line-through' : ''">{{ todo.txt }}</p>
                </div>
                <span class="todo-more" @click="currOpenMore = todo._id">...</span>
                <div
                    v-clickoutside="closeMoreMenus"
                    v-if="currOpenMore === todo._id"
                    class="more-menu"
                >
                    <div class="more-header">
                        <h3 class="menu-title">Item actions</h3>
                    </div>
                    <hr />
                    <div class="more-main">
                        <p @click="convertToCard(todo)">Convert to card</p>
                        <p @click="removeTodo">Delete</p>
                    </div>
                </div>
            </li>
        </ul>
        <div class="add-item-container">
            <input type="text" class="todo-text" v-model="txt" />
            <button @click="addTodo()" class>Add</button>
            <span class="icon stop-adding-icon"></span>
        </div>
    </section>
</template>

<script>
import { utilService } from "../services/util.service"

export default {
    props: {
        checklist: Object
    },
    data() {
        return {
            txt: '',
            currOpenMore: ''
        }
    },
    created() {

    },
    methods: {
        addTodo() {
            this.checklist.todos.push({
                _id: utilService.makeId(),
                txt: this.txt,
                isDone: false
            })
            this.updateChecklist();
            this.txt = '';
        },
        updateChecklist() {
            this.$emit('checklistUpdated', this.checklist);
        },
        removeTodo(todoId) {
            const idx = this.checklist.todos.findIndex(t => t._id === todoId);
            this.checklist.todos.splice(idx, 1);
            this.updateChecklist();
        },
        closeMoreMenus() {
            this.currOpenMore = '';
        },
        convertToCard(todo) {
            this.$emit('convert-todo', todo.txt);
            this.removeTodo(todo._id)
        }
    },
    computed: {
        todoPercentage() {
            if (!this.checklist.todos?.length) return 0;
            let doneTodos = this.checklist.todos.reduce((acc, t) => {
                if (t.isDone) acc++;
                return acc;
            }, 0)
            return (Math.floor(doneTodos / this.checklist.todos.length * 100))
        },
        progressColor() {
            return (this.todoPercentage === 100) ? 'success' : ''
        }
    }
}
</script>