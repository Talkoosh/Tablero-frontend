<template>
    <div v-if="board" class="main-board" :style="boardBg">
        <header>
            <board-header @open-menu="openMenu" @change-board-bgc="changeBoardBgc" :board="board" />
        </header>
        <div class="groups-container">
            <board-group
                @group-title-changed="updateGroup"
                @task-added="addTask"
                v-for="group in board.groups"
                :key="group._id"
                :group="group"
                :boardId="board._id"
            />
            <div class="add-group" :class="addGroupCondition">
                <span v-if="!isAddGroup" @click="toggleAddGroup">+ Add another list</span>
                <div v-else>
                    <input
                        ref="addGroup"
                        type="text"
                        v-model="groupToAdd.title"
                        placeholder="Enter list title..."
                        @blur="toggleAddGroup"
                        @keyup.enter="addGroup"
                    />
                    <div class="add-group-btns">
                        <button @click="addGroup" class="add-group-btn">Add list</button>
                        <button @click="isAddGroup = false" class="cancel-add-group-btn">
                            <span class="x-icon"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <board-menu
        @change-board-bgc="changeBoardBgc"
        @close-menu="closeMenu"
        :class="menuStatus"
        :board="board"
    />
    <router-view></router-view>
</template>

<script>
import boardHeader from "../components/board.header.vue"
import boardGroup from "../components/board.group.vue"
import boardMenu from "../components/board.menu.vue"


export default {
    // props: [''],
    components: {
        boardHeader,
        boardGroup,
        boardMenu,
    },
    async created() {
        this.$store.dispatch('loadBoards')
        const id = this.$route.params.boardId
        await this.$store.commit({ type: 'setCurrBoardId', boardId: id })
    },
    data() {
        return {
            isAddGroup: false,
            groupToAdd: { title: '' },
            isMenuOpen: false,
        }
    },
    methods: {
        addGroup() {
            if (!this.groupToAdd.title) return
            this.$store.dispatch({ type: 'addGroup', boardId: this.board._id, groupToAdd: this.groupToAdd })
            this.groupToAdd = { title: '' }
        },
        toggleAddGroup() {
            if (this.isAddGroup) {
                setTimeout(() => {
                    this.isAddGroup = false
                }, 100)
            } else {
                this.isAddGroup = true
                setTimeout(() => {
                    this.$refs.addGroup.focus();
                }, 100)
            }
        },
        async addTask(task) {
            await this.$store.dispatch({ type: 'addTask', task, boardId: this.board._id })
        },
        updateGroup(groupToEdit) {
            this.$store.dispatch({ type: 'editGroup', groupToEdit, boardId: this.board._id })
        },
        openMenu() {
            this.isMenuOpen = true
        },
        changeBoardBgc(bgc) {
            this.$store.dispatch({ type: 'changeBoardBgc', bgc, boardId: this.board._id })
        },
        closeMenu() {
            this.isMenuOpen = false
        }
    },
    computed: {
        board() {
            return this.$store.getters.currBoard
        },
        addGroupCondition() {
            return this.isAddGroup ? 'add-group-active' : ''
        },
        boardBg() {
            if (!this.board.style.backgroundColor && !this.board.style.photo) return
            if (this.board.style.backgroundColor) return `background-color: ${this.board.style.backgroundColor}`
            else return `background: url('${this.board.style.photo}')`
        },
        menuStatus() {
            return this.isMenuOpen ? 'menu-open' : 'menu-close'
        }
    },
    unmounted() { },
}
</script>