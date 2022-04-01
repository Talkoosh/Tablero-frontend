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
                            v-model="board.title"
                            ref="titleEdit"
                            v-clickoutside="stopEdit"
                            @input="saveBoardTitle"
                            @keyup.enter="toggleEditTitle"
                            :style="'width:' + ((board.title.length * 1) * 10) + 'px'"
                        />
                    </div>
                    <!-- :style="'width:' + (board.title.length * 10 + 15) + 'px'" -->
                    <!-- @keypress="this.style.width = ((this.value.length + 1) * 8) + 'px';" -->
                </div>
                <div class="board-header-btn board-starred" :style="btnBgc">
                    <a @click.prevent="starBoard" :style="textColor" class="star-board">
                        <!-- <span class="star-icon"></span> -->
                        <span :class="isStarred"></span>
                    </a>
                </div>
                <div class="board-members" :style="'width: ' + board.members.length * 21 + 'px'">
                    <span
                        v-for="(member, idx) in board.members"
                        href
                        :style="'left:' + idx * 21 + 'px;'"
                    >
                        <avatar-profile
                            :username="member.username"
                            @click="openMemberDetails = member._id"
                            :title="member.email"
                        />
                        <div
                            v-if="openMemberDetails === member._id"
                            class="member-details"
                            v-clickoutside="closeMemberDetails"
                        >
                            <div class="member-details-header">
                                <avatar-profile :username="member.username" :title="member.email" />
                                <span>{{ member.username }}</span>
                            </div>
                            <div class="member-details-body">
                                <hr />
                                <button @click="removeMember(member._id)">
                                    <span>Remove from board...</span>
                                </button>
                            </div>
                        </div>
                    </span>
                </div>
                <button
                    class="invite-btn"
                    ref="inviteMembersBtn"
                    @click="openInviteMembers"
                    :disabled="loggedinUser ? false : true"
                    :title="loggedinUser ? 'Invite members to your board' : 'Login to add members'"
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
import avatarProfile from "./avatar.profile.vue"
export default {
    props: {
    },
    components: {
        avatarProfile
    },
    created() {
    },
    data() {
        return {
            isEditTitle: false,
            openMemberDetails: null,
        }
    },
    methods: {
        toggleEditTitle() {
            this.isEditTitle = !this.isEditTitle
            if (this.isEditTitle)
                setTimeout(() => {
                    this.$refs.titleEdit.focus()
                }, 100)
        },
        saveBoardTitle() {
            this.$emit('board-title-changed', JSON.parse(JSON.stringify(this.board)))
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
        },
        closeMemberDetails() {
            this.openMemberDetails = null;
        },
        async removeMember(memberId) {
            if (this.loggedinUser._id !== this.board.createdBy._id || this.board.createdBy._id === memberId || !this.loggedinUser) return
            await this.$store.dispatch({ type: 'removeUserFromBoard', memberId, boardId: this.board._id })
        },
    },
    computed: {
        board() {
            return this.$store.getters.currBoard
        },
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
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser
        },
    },
}
</script>