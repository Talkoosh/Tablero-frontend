<template>
    <section class="board-header">
        <nav class="board-header-nav">
            <div class="board-header-left">
                <div class="board-header-btn board-name">
                    <a href>
                        <span>{{ board.title }}</span>
                    </a>
                </div>
                <div class="board-header-btn board-starred">
                    <a href>
                        <span class="star-icon">S</span>
                    </a>
                </div>
                <div class="board-header-btn board-privacy">
                    <a href>
                        <span class="privacy-icon">{{ boardPrivacyIcon }}</span>
                        <span class="board-privacy-text">Private</span>
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
                <div class="board-header-btn board-filter">
                    <a href>
                        <span class="filter-icon">F</span>
                        <span>Filter</span>
                    </a>
                </div>
                <div class="board-header-btn board-menu">
                    <a href>
                        <span class="menu-icon">M</span>
                        <span>Show menu</span>
                    </a>
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
    components: {},
    created() { },
    data() {
        return {
        }
    },
    methods: {},
    computed: {
        boardPrivacyIcon() {
            return 'Locked'
        }
    },
    unmounted() { },
}
</script>