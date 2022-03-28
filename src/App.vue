<template>
  <section :style="bodyOverflow"  class="app-container">
    <main-header v-if="isHomePage" @open-drop="openDrop" />
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
import mainHeader from "./components/main.header.vue";
import createBoardDrop from "./components/create.board.drop.vue";
import recentBoardsDrop from "./components/recent.boards.drop.vue";
import starredBoardsDrop from "./components/starred.boards.drop.vue";

export default {
  // props: [''],
  components: {
    createBoardDrop,
    recentBoardsDrop,
    starredBoardsDrop,
    mainHeader,
  },
  emits: ["openDrop", "open-drop"],
  created() {
    window.addEventListener("popstate", function (event) {
      // Log the state data to the console
      console.log(event.state);
    });
  },
  data() {
    return {
      currDropDown: null,
      isHomePage : false,
      overflow: 'hidden',
    };
  },
  methods: {
    openDrop(cmp) {
      this.currDropDown = cmp;
    },
    closeDrop() {
      this.currDropDown = null;
    },
  },
  computed: {
   bodyOverflow(){
     return `overflow: ${this.overflow}`
   }
  },
  unmounted() {},
  watch: {
    $route(to, from) {
       this.isHomePage = (this.$route.path !== '/' && this.$route.path !== '/login');
 
       this.overflow = (this.$route.path === '/login') ? 'auto' : 'hidden'
    },
  },
};
</script>