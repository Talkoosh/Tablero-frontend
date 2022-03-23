<template>
    <div v-if="board" class="main-board">
        <header>
            <board-header :board="board" />
        </header>
        <div class="groups-container">
            <board-group v-for="group in board.groups" :key="board._id" :group="group" />
            <div class="add-group">
                <span v-if="!isAddGroup" @click="toggleAddGroup">+ Add another list</span>
                <div v-else>
                    <input
                        ref="addGroup"
                        type="text"
                        v-model="groupToAdd.title"
                        placeholder="Enter list title..."
                        @blur="toggleAddGroup"
                    />
                    <div class="add-group-btns">
                        <button @click="addGroup" class="add-group-btn">Add list</button>
                        <button @click="isAddList = false" class="cancel-add-group-btn">X</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <router-view></router-view>
</template>

<script>
import boardHeader from "../components/board.header.vue"
import boardGroup from "../components/board.group.vue"

export default {
    // props: [''],
    components: {
        boardHeader,
        boardGroup
    },
    async created() {
        this.$store.dispatch('loadBoards')
        const id = this.$route.params.boardId
        this.$store.commit({ type: 'setCurrBoardId', boardId: id })
    },
    data() {
        return {
            isAddGroup: true,
            groupToAdd: { title: '' }
        }
    },
    methods: {
        addGroup() {
            if (!this.groupToAdd.title) return
            this.$store.dispatch({ type: 'addGroup', boardId: this.board._id, groupToAdd: this.groupToAdd })
        },
        toggleAddGroup() {
            if (this.isAddGroup) {
                this.isAddGroup = false
            } else {
                this.isAddGroup = true
                setTimeout(() => {
                    this.$refs.addGroup.focus();
                }, 100)
            }

        }
    },
    computed: {
        board() {
            return this.$store.getters.currBoard
        },
    },
    unmounted() { },
}
</script>