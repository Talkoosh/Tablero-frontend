<template>
    <div v-if="board">
        <board-header />
        <section>{{ board.title }}</section>
        <board-group v-for="group in board.groups" :key="board._id" :group="group" />
        <div class="add-group">
            <span>+ Add another list</span>
            <input type="text" v-model="groupToAdd.title" placeholder="Enter list title..." />
            <button @click="addGroup" class="add-group-btn">Add list</button>
            <button @click="isAddList = false" class="cancel-add-group-btn">X</button>
        </div>
    </div>
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
            isAddGroup: false,
            groupToAdd: { title: '' }
        }
    },
    methods: {
        addGroup() {
            if (!this.groupToAdd.title) return
            this.$store.dispatch({ type: 'addGroup', boardId: this.board._id, groupToAdd: this.groupToAdd })
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