<template>
  <section class="login-page">
    <div class="logo-container">
      <div  class="logo-img"> </div>
      <div class="logo-text">Tablero</div>
    </div>

    <section class="login-content-container">
      <div class="content-wrapper">
        <div class="login-content">
          <h1 v-if="!this.isSignUpPageOpen" class="header"
          @click="toggleLoginPage"
          >Login to Tablero</h1>
          <h1 v-else class="header"
          @click="toggleLoginPage"
          >Sign up for your acount</h1>

          <div class="login-password-container">
            <div class="email-password">
              <div class="inputs-container">
                <input type="email" class="login-input" placeholder="Enter email "
                v-model="userMail" ref="mailInput" autofocus />
                <input  type="text" v-model="userPassword"
                 class="login-input" placeholder="Enter password"  />
              </div>
              <input v-if="!this.isSignUpPageOpen" type="submit"
               class="login-submit" value="Log in" />
               <input v-else type="submit"
               value="Sign Up" :class="isValidMail" />
            </div>

            <div :style="checkTypingSignUp" class="login-methods-container">
              <div class="login-methods-seperator">OR</div>

              <div class="login-methods">
                <div class="method-btn">
                  <span class="google-icon"></span>
                  <span class="text">Continue with Google</span>
                </div>

                <div class="method-btn">
                  <span class="facebook-icon"></span>
                  <span class="text">Continue with Facebook</span>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <ul class="bottom-link">
            <li class="sign-up-link">
              <div v-if="!this.isSignUpPageOpen"  class="sign-up"
              @click="toggleLoginPage"
                >Sign up for an acount</div
              >
               <div v-else :to="'/login/'" class="sign-up"
               @click="toggleLoginPage"
                >Already have an acount? Log in</div
              >
            </li>
          </ul>
        </div>
      </div>
    </section>

    <div class="background">
        <div class="left-img">
            <svg src="@assets/img/tabelro-left.svg" alt="" class="left"/>
        </div>
        <div class="right-img">
            <svg src="@assets/img/tabelro-right.svg" alt="" class="right"/>
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
    return {
        isSignUpPageOpen:false,
        userMail : '',
        userPassword : '',

    };
  },
  methods: {
      toggleLoginPage(){
          this.isSignUpPageOpen = !this.isSignUpPageOpen;
          this.$refs.mailInput.focus();
      },
  


  },
  computed: {
      checkPage(){
          return (this.isSignUpPageOpen) ? 'display : none' : '';
      },
      checkTypingSignUp(){
          return ((this.userMail || this.userPassword) && this.isSignUpPageOpen)
           ? 'display : none' : '' ;
      },
      isValidMail(){
          return (this.userMail.includes('@')) ? 'login-submit' : 'unvalid-mail';
      }

  },
  unmounted() {},
};
</script>