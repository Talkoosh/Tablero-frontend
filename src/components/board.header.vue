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
                    <button @click="openMenu">
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
        openMenu() {
            this.$emit('open-menu')
        }
    },
    computed: {
    },
    unmounted() { },
}
</script>