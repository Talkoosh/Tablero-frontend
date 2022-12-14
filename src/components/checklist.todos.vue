<template>
    <section>
        <div class="progress-bar-basic">
            <div class="todo-perc">{{ todoPercentage }}</div>
            <div
                :style="{ width: todoPercentage + '%', background: progressColor }"
                class="progress-bar-actual"
            ></div>
        </div>
        <ul>
            <li
                @mouseover="showMore(todo._id)"
                @mouseleave="showMore('')"
                class="todo"
                v-for="todo in checklist.todos"
                :key="todo._id"
            >
                <div class="todo-text-container">
                    <label class="checkbox-container">
                        <input
                            class="is-done-btn"
                            type="checkbox"
                            @change="updateChecklist"
                            v-model="todo.isDone"
                        />
                        <span class="custom-checkbox"></span>
                    </label>
                    <p :style="todo.isDone ? 'text-decoration: line-through' : ''">{{ todo.txt }}</p>
                </div>
                <span :ref="todo._id" class="todo-more" @click="currOpenMore = todo._id">...</span>
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
                        <p @click="removeTodo(todo._id)">Delete</p>
                    </div>
                </div>
            </li>
            <button v-if="!isAdding" @click.stop="openAdding" class="add-item-btn">Add an item</button>
        </ul>
        <div v-show="isAdding" v-clickoutside="closeAdding" class="add-item-container">
            <textarea ref="text" type="text" class="todo-text" v-model="txt"></textarea>
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
            currOpenMore: '',
            isAdding: false
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
            const idx = this.checklist.todos.findIndex(t => {
                return t._id === todoId
            })
            this.checklist.todos.splice(idx ,1);
            this.updateChecklist();
        },
        closeMoreMenus() {
            this.currOpenMore = '';
        },
        convertToCard(todo) {
            this.$emit('convert-todo', { ...todo }, JSON.parse(JSON.stringify(this.checklist)));
        },
        showMore(todoId) {
            for (let ref in this.$refs) {
                if (ref === todoId) this.$refs[ref][0].style.visibility = 'visible'
                else if (ref !== todoId && this.$refs[ref][0]) this.$refs[ref][0].style.visibility = 'hidden'
            }
        },
        openAdding() {
            this.isAdding = true;
            setTimeout(() => {
                this.$refs.text.focus();
            }, 50)
        },
        closeAdding() {
            this.isAdding = false
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
            return (this.todoPercentage === 100) ? '#61bd4f' : '#5ba4cf'
        }
    }
}
</script>