<template>
  <section class="home-page">
    <header class="home-header">
      <nav class="homepage-nav">
        <router-link class="main-logo" :to="'/board/'">Tablero</router-link>
        <div class="login-container">
          <router-link class="login" :to="'/board/'">Log in</router-link>
          <router-link class="logout" :to="'/board/'">Sign up</router-link>
        </div>
      </nav>
    </header>

    <section class="home-container">
      <div class="home-page-content">
        <div class="home-page-content-container">
          <div class="home-page-right">
            <!-- <img src="" alt=""> -->
          </div>
          <div class="home-page-left">
            <h1 class="header"></h1>
            <p class="home-text">
              Collaborate, manage projects, and reach new productivity peaks.
              From high rises to the home office, the way your team works is
              unique—accomplish it all with Trello.
            </p>
            <form action="" class="form-container">
                <div class="input-container">
                    <input type="email" class="email-input">
                </div>
                <div class="start-btn-container">
                    <button class="start-btn">Try live demo!</button>
                </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  // props: [''],
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
  unmounted() {},
};
</script>