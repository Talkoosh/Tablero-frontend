<template>
  <section class="app-container">
    <main-header />
    <router-view />
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
    return {}
  },
  methods: {},
  computed: {},
  unmounted() { },
}
</script>