<template>
  <router-link
    class="board-card"
    :to="'/board/' + boardId">
      <span class="board-card-title"> {{ boardName }}</span>
  </router-link>
</template>

<script>
export default {
    props: {
        boardName: String,
        boardId: String,
    },
    components: {
    },
    created() { },
    data() {
        return {}
    },
    methods: {},
    computed: {},
    unmounted() { },
}
</script>