<template>
    <section class="board-header">
        <nav class="board-header-nav">
            <div class="board-name">
                <a href>
                    <h1>{{ board.title }}</h1>
                </a>
            </div>
            <div class="board-starred">
                <a href>
                    <span class="star-icon">S</span>
                </a>
            </div>
            <div class="board-privacy">
                <a href>
                    <span class="privacy-icon">{{ boardPrivacyIcon }}</span>
                    <span class="board-privacy-text">Private</span>
                </a>
            </div>
            <div class="board-members">
                <a v-for="member in board.members" href>
                    <img :src="member.imgUrl" alt="member img" />
                </a>
                <a href>
                    <span class="invite-icon">I</span>
                    <span>Invite</span>
                </a>
            </div>
            <div class="board-menu">
                <a href>
                    <span class="menu-icon">M</span>
                    <span>Show menu</span>
                </a>
            </div>
            <div class="board-filter">
                <a href>
                    <span class="filter-icon">F</span>
                    <span>Filter</span>
                </a>
            </div>
        </nav>
    </section>
</template>

<script>
export default {
    // props: [''],
    components: {},
    created() { },
    data() {
        return {
            board: {
                title: 'TestTest',
                members: [
                    {
                        _id: 'u101',
                        fullname: 'Tal Tarablus',
                        imgUrl: 'https://www.google.com',
                    },
                    {
                        _id: 'u102',
                        fullname: 'Tomer kushtai',
                        imgUrl: 'https://www.google.com',
                    },
                ],
            }
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