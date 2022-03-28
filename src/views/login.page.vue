<template>
  <section class="login-page">
    <div class="logo-container">
      <div  class="logo-img"> </div>
      <div class="logo-text">Tablero</div>
    </div>

    <section class="login-content-container">
      <div class="content-wrapper">
        <div class="login-content">
          <h1 class="header">Login to Tablero</h1>
          <div class="login-password-container">
            <div class="email-password">
              <div class="inputs-container">
                <input type="email" class="email-input" placeholder="Enter email" />
                <input type="text" class="password-input" placeholder="Enter password" />
              </div>
              <input type="submit" class="login-submit" value="Log in" />
            </div>

            <div class="login-methods-container">
              <div class="login-methods-seperator">OR</div>

              <div class="login-methods">
                <div class="google-btn">
                  <span class="google-icon"></span>
                  <span class="google-text">Continue with google</span>
                </div>

                <div class="facebook-btn">
                  <span class="facebook-icon"></span>
                  <span class="facebook-text">Continue with facebook</span>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <ul class="bottom-link">
            <li class="sign-up-link">
              <router-link :to="'/board/'" class="sign-up"
                >Sign up for an acount</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </section>

    <div class="background">
        <div class="left-img">
            <!-- <img src="@assets/img/tabelro-left.svg" alt="" class="left"> -->
        </div>
        <div class="right-img">
            <!-- <img src="@assets/img/tabelro-right.svg" alt="" class="right"> -->
        </div>
    </div>

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