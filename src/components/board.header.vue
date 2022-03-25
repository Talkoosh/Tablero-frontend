<template>
    <section class="board-header">
        <nav class="board-header-nav">
            <div class="board-header-left">
                <div class="board-header-btn board-name">
                    <div class="title">
                        <span @click="toggleEditTitle" v-if="!isEditTitle">{{ board.title }}</span>
                        <input
                            v-else
                            type="text"
                            v-model="boardToEdit.title"
                            ref="titleEdit"
                            v-clickoutside="saveBoardTitle"
                        />
                    </div>
                </div>
                <div class="board-header-btn board-starred">
                    <a href>
                        <span class="star-icon"></span>
                    </a>
                </div>
                <div class="board-members" :style="'width: ' + board.members.length * 75 + 'px'">
                    <span
                        v-for="(member, idx) in board.members"
                        href
                        :style="'left:' + idx * 18 + 'px'"
                    >
                        <img :src="member.imgUrl" alt="member img" />
                    </span>

                    <a href style="right:20px">
                        <button>
                            <span class="invite-icon">I</span>Invite
                        </button>
                    </a>
                </div>
            </div>
            <div class="board-header-right">
                <div class="board-header-btn board-menu">
                    <a href>
                        <span class="menu-icon"></span>
                        <span>Show menu</span>
                    </a>
                </div>
            </div>
        </nav>
        <board-menu @change-board-bgc="changeBoardBgc" />
    </section>
</template>

<script>
import boardMenu from "./board.menu.vue"
export default {
    props: {
        board: Object,
    },
    components: {
        boardMenu

    },
    created() { },
    data() {
        return {
            isEditTitle: false,
            boardToEdit: {
                title: this.board.title
            }
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
            this.isEditTitle = !this.isEditTitle
            console.log('a')
        },
        changeBoardBgc(bgc) {
            this.$emit('change-board-bgc', bgc)
        }
    },
    computed: {
    },
    unmounted() { },
}
</script>