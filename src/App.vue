<template>
  <section :style="bodyOverflow" class="app-container">
    <main-header v-if="isHomePage" @open-drop="openDrop" />
    <router-view />
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
import acountDrop from './components/acount.drop.vue'

export default {
  // props: [''],
  components: {
    createBoardDrop,
    recentBoardsDrop,
    starredBoardsDrop,
    mainHeader,
    acountDrop
  },
  emits: ["openDrop", "open-drop"],
  created() {
    this.$store.dispatch({ type: 'getLoggedinUser' })
  },
  data() {
    return {
      currDropDown: null,
      isHomePage: false,
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
    bodyOverflow() {
      return `overflow: ${this.overflow}`
    },
<<<<<<< HEAD
    // bodyBGC(){
    //   return  (this.isLoginPage) ? 'background-color:#f9fafc;' : '';
    // }
    loggedinUser() {
      return this.$store.getters.loggedinUser
    }
=======
  
>>>>>>> 1156b9ba79c8c26c780f412cbfc4fb145f9dae4d
  },
  unmounted() { },
  watch: {
    $route(to, from) {
      this.isHomePage = (this.$route.path !== '/' && this.$route.path !== '/login');

      this.overflow = (this.$route.path === '/login') ? 'auto' : 'hidden'
      if (this.$route.path === '/login' || this.$route.path === '/' && this.loggedinUser) this.$router.push('/board')
    },
  },
};
</script>