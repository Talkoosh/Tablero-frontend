<template>
    <section class="board-header">
        <nav class="board-header-nav">
            <div class="board-header-left">
                <div class="board-header-btn board-name">
                    <div class="title">
                        <h1 @click="toggleEditTitle" v-if="!isEditTitle">{{ board.title }}</h1>
                        <input
                            v-else
                            type="text"
                            v-model="boardToEdit.title"
                            ref="titleEdit"
                            v-clickoutside="stopEdit"
                            @input="saveBoardTitle"
                            :style="'width:' + (boardToEdit.title.length * 10 + 15) + 'px'"
                        />
                    </div>
                </div>
                <div class="board-header-btn board-starred">
                    <a href>
                        <span class="star-icon"></span>
                    </a>
                </div>
                <div class="board-members" :style="'width: ' + board.members.length * 32 + 'px'">
                    <span
                        v-for="(member, idx) in board.members"
                        href
                        :style="'left:' + idx * 25 + 'px'"
                    >
                        <img :src="member.imgUrl" alt="member img" />
                    </span>
                </div>
                <a href style="right:20px;">
                    <button>
                        <span class="invite-icon"></span>
                        <span>Invite</span>
                    </button>
                </a>
            </div>
            <div class="board-header-right">
                <div class="board-header-btn board-menu">
                    <button @click="openMenu" class="menu-btn">
                        <span class="menu-icon"></span>
                        <span>Show menu</span>
                    </button>
                </div>
            </div>
        </nav>
    </section>
</template>

<script>
export default {
    props: {
        board: Object,
    },
    components: {
    },
    created() {
        this.boardToEdit = JSON.parse(JSON.stringify(this.board))
    },
    data() {
        return {
            isEditTitle: false,
            boardToEdit: null,
        }
    },
    methods: {
        toggleEditTitle() {
            this.isEditTitle = !this.isEditTitle
            setTimeout(() => {
                this.$refs.titleEdit.focus()
            }, 100)
        },
        saveBoardTitle() {
            this.$emit('board-title-changed', this.boardToEdit)
        },
        stopEdit() {
            this.isEditTitle = !this.isEditTitle

        },
        openMenu() {
            this.$emit('open-menu')
        }
    },
    computed: {
    },
    unmounted() { },
}
</script>