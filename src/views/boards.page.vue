<template>
    <section>
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