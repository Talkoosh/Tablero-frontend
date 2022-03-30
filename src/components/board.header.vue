<template>
    <section class="board-header" :style="bgDarkness">
        <nav class="board-header-nav">
            <div class="board-header-left">
                <div class="board-header-btn board-name">
                    <div class="title">
                        <h1
                            @click="toggleEditTitle"
                            v-if="!isEditTitle"
                            :style="textColor"
                        >{{ board.title }}</h1>
                        <input
                            v-else
                            type="text"
                            v-model="boardToEdit.title"
                            ref="titleEdit"
                            v-clickoutside="stopEdit"
                            @input="saveBoardTitle"
                            @keyup.enter="toggleEditTitle"
                            :style="'width:' + (boardToEdit.title.length * 10 + 15) + 'px'"
                        />
                    </div>
                </div>
                <div class="board-header-btn board-starred" :style="btnBgc">
                    <a @click.prevent="starBoard" :style="textColor" class="star-board">
                        <!-- <span class="star-icon"></span> -->
                        <span :class="isStarred"></span>
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
                <button
                    class="invite-btn"
                    style="right:20px;"
                    ref="inviteMembersBtn"
                    @click="openInviteMembers"
                >
                    <button>
                        <span class="invite-icon"></span>
                        <span>Invite</span>
                    </button>
                </button>
            </div>
            <div class="board-header-right">
                <div class="board-header-btn board-menu" :style="btnBgc">
                    <button @click="openMenu" class="menu-btn" :style="textColor">
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
            this.$emit('board-title-changed', JSON.parse(JSON.stringify(this.boardToEdit)))
        },
        stopEdit() {
            this.isEditTitle = !this.isEditTitle

        },
        openMenu() {
            this.$emit('open-menu')
        },
        async starBoard() {
            await this.$store.dispatch({
                type: "starBoard",
                boardId: this.board._id,
            });
        },
        openInviteMembers() {
            const y = this.$refs.inviteMembersBtn.getBoundingClientRect().top;
            const x = this.$refs.inviteMembersBtn.getBoundingClientRect().right;
            const pos = { x, y }
            this.$emit('open-invite', pos)
        }
    },
    computed: {
        bgc() {
            return this.$store.getters.boardBgc
        },
        textColor() {
            if (!this.bgc) return
            return this.bgc.isLight ? 'color: #172b4d' : 'color: white'
        },
        btnBgc() {
            if (!this.bgc) return
            return this.bgc.isLight ? 'background-color: #0000001a' : 'background-color: #ffffff3d'
        },
        bgDarkness() {
            if (this.board.style.backgroundColor) return ``
            else return `background: #0000003d;`
        },
        isStarred() {
            return this.board.isStarred ? 'starred' : 'not-starred'
        }
    },
    unmounted() { },
}
</script>