<template>
  <section class="app-container">
    <main-header @open-drop="openDrop" />
    <router-view @open-drop="openDrop" />
    <component
      :is="currDropDown"
      v-if="currDropDown"
      @close-drop="closeDrop"
      v-clickoutside="closeDrop"
    />
  </section>
</template>


<script>
import mainHeader from './components/main.header.vue'
import createBoardDrop from './components/create.board.drop.vue'
import recentBoardsDrop from './components/recent.boards.drop.vue'
import starredBoardsDrop from './components/starred.boards.drop.vue'

export default {
  // props: [''],
  components: {
    createBoardDrop,
    recentBoardsDrop,
    starredBoardsDrop,
    mainHeader
  },
  created() {
  },
  data() {
    return {
      currDropDown: null
    }
  },
  methods: {
    openDrop(cmp) {
      console.log(cmp)
      this.currDropDown = cmp;
    },
    closeDrop() {
      this.currDropDown = null;
    }


  },
  computed: {

  },
  unmounted() {

  },
}
</script>