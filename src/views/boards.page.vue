<template>
    <section class="boards-page">
        <div class="boards-page-nav"></div>
        <div class="starred-boards-container">
            <div class="all-boards">
                <div class="starred-boards">
                    <div class="icon"></div>
                    <h3 class="starred-header">Starred boards</h3>
                </div>
            </div>
            <div class="starred-boards-list-container">
                <ul class="starred-boards-list"></ul>
            </div>
        </div>

        <div class="your-boards"></div>

        <router-link v-for="board in boards" :to="'/board/' + board._id">BOARD</router-link>
    </section>
</template>

<script>
// import '' from ''

export default {
    // props: [''],
    components: {},
    created() {
        this.$store.dispatch('loadBoards')
    },
    data() {
        return {}
    },
    methods: {},
    computed: {
        boards() {
            return this.$store.getters.boards
        }
    },
    unmounted() { },
}
</script>