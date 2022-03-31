<template>
    <section style="height:100%">
        <div class="group-container">
            <div class="group">
                <div class="group-header">
                    <h2
                        @click="toggleEditGroupTitle"
                        v-if="!isEditGroupTitle"
                        class="group-title"
                    >{{ group.title }}</h2>
                    <input
                        v-clickoutside="saveGroupTitle"
                        @keyup.enter="saveGroupTitle"
                        v-else
                        ref="editGroupTitle"
                        type="text"
                        v-model="groupToEdit.title"
                    />
                    <div @click="toggleExtrasMenu" class="group-extras">
                        <span class="dots-icon">...</span>
                    </div>
                </div>
                <div
                    class="group-extras-menu"
                    v-if="isExtrasOpen"
                    v-clickoutside="toggleExtrasMenu"
                >
                    <h3 class="menu-title">List actions</h3>
                    <span class="extras-exit"></span>
                    <hr />
                    <div class="extras-btns">
                        <button class="add-task-btn">
                            <span>Add card...</span>
                        </button>
                        <button class="copy-group-btn">
                            <span>Copy list...</span>
                        </button>
                        <button class="sort-by-btn">
                            <span>Sort by...</span>
                        </button>
                        <button @click="deleteGroup" class="archive-group-btn">
                            <span>Archive this list</span>
                        </button>
                    </div>
                </div>
                <!-- v-if="group.tasks.length" -->
                <div class="group-tasks">
                    <Container
                        group-name="1"
                        :get-child-payload="getChildPayload"
                        orientation="vertical"
                        @drop="onDrop"
                        class="drag-task-container"
                    >
                        <Draggable v-for="task in group.tasks" :key="task._id">
                            <task-preview :task="task" :boardId="boardId" />
                        </Draggable>
                    </Container>
                </div>
                <div class="add-task" :class="addTaskCondition">
                    <div @click="toggleAddTask" v-if="!isAddTask" class="add-task-unactive">
                        <span>+</span>
                        Add a card
                    </div>
                    <div v-clickoutside="toggleAddTask" class="add-task-active" v-else>
                        <!-- <div class="add-task-area-container"> -->
                        <div class="textarea-container">
                            <textarea
                                v-model="taskToAdd.title"
                                ref="addTask"
                                placeholder="Enter a title for this card..."
                            />
                        </div>
                        <div class="add-task-btns">
                            <button @mouseup="addTask" class="add-task-btn">Add Card</button>
                            <button @click="isAddTask = false" class="cancel-add-task-btn">
                                <span class="x-icon"></span>
                            </button>
                        </div>
                        <!-- </div> -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import taskPreview from "./task.preview.vue"
import { Container, Draggable } from "vue3-smooth-dnd";
import FastAverageColor from 'fast-average-color';


export default {
    props: {
        group: Object,
        boardId: String,
    },
    components: {
        taskPreview,
        Container,
        Draggable,
    },
    created() {
    },
    data() {
        return {
            isAddTask: false,
            isEditGroupTitle: false,
            taskToAdd: {
                title: '',
                groupId: this.group._id
            },
            isExtrasOpen: false
        }
    },
    methods: {
        toggleAddTask() {
            this.isAddTask = !this.isAddTask;
        },
        async addTask() {
            if (!this.taskToAdd.title) return
            const a = await this.$emit('task-added', this.taskToAdd)
            this.taskToAdd = {
                title: '',
                groupId: this.group._id
            }
        },
        toggleEditGroupTitle() {
            this.isEditGroupTitle = !this.isEditGroupTitle;
            if (this.isEditGroupTitle) {
                setTimeout(() => {
                    this.$refs.editGroupTitle.focus();
                }, 100)
            }
        },
        saveGroupTitle() {
            this.$emit('group-title-changed', this.groupToEdit)
            this.isEditGroupTitle = !this.isEditGroupTitle;
        },
        async onDrop(dropResult) {
            if (dropResult.addedIndex === null && dropResult.removedIndex === null) return
            this.group.tasks = this.applyDrag(this.group.tasks, dropResult);
            dropResult.payload._id
            await this.$store.dispatch({ type: 'editGroup', groupToEdit: this.group, boardId: this.boardId })
            this.$store.dispatch({ type: 'saveBoard', board: this.$store.getters.currBoard })
        },
        applyDrag(arr, dragResult) {
            const { removedIndex, addedIndex, payload } = dragResult;

            if (removedIndex === null && addedIndex === null) return arr;
            const result = [...arr];
            let itemToAdd = payload;

            if (removedIndex !== null) {
                itemToAdd = result.splice(removedIndex, 1)[0];
            }
            if (addedIndex !== null) {
                result.splice(addedIndex, 0, itemToAdd);
            }
            return result;
        },
        getChildPayload(idx) {
            return this.group.tasks[idx]
        },
        toggleExtrasMenu() {
            this.isExtrasOpen = !this.isExtrasOpen
        },
        deleteGroup() {
            this.$store.dispatch({ type: 'deleteGroup', groupId: this.group._id, boardId: this.boardId })
        },
    },
    computed: {
        addTaskCondition() {
            return this.isAddTask ? 'add-task-active' : '';
        },
        groupToEdit() {
            const group = { ...this.group }
            return group
        }
    },
}
</script>