<template>
  <section class="app-container">
    <main-header />
    <router-view />
    <component :is="currDropDown" />
  </section>
</template>


<script>
import mainHeader from './components/main.header.vue'

export default {
  // props: [''],
  components: {
    mainHeader
  },
  created() {
  },
  data() {
    return {
      currDropDown: null
    }
  },
  methods: {},
  computed: {},
  unmounted() { },
}
</script>