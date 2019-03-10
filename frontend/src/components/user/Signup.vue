<template>
  <div class="col-sm-12 col-md-6 col-lg-3 col-lg-2">

    <white-logo viewBox="0 0 300 200"></white-logo>

    <div v-if="signupStatus === 'signup'">
      <form-input label="Email" v-model="username"></form-input>
      <form-input label="Password" v-model="password" type="password"></form-input>
      <div style="margin-top: 40px;">
        <form-button :class="['float-left', 'light']">
          <router-link :to="{'name': 'login'}">&laquo; Back to Login</router-link>
        </form-button>

        <form-button :class="['float-right', 'light']">
          <a @click.prevent="signUp">Sign me up!</a>
        </form-button>
      </div>
    </div>
  
    <div v-if="signupStatus === 'verify'">
      <p>Please confirm your email-address. After confirming you are good to go!</p>
      <form-button :class="['float-right', 'light']">
        <router-link :to="{'name': 'login'}">&laquo; Back to Login</router-link>
      </form-button>
    </div>
  </div>
</template>

<script>
import FormButton from '@/components/FormButton'
import FormInput from '@/components/FormInput'
import WhiteLogo from '@/assets/img/logo_white.svg';

export default {
  name: 'Login',
  data: () => {
    return {
      user: undefined,
      username: '',
      password: '',
      signupStatus: 'signup',
      loading: false
    }
  },
  components: {
    FormButton,
    FormInput,
    WhiteLogo
  },
  methods: {
    signUp () {
      this.loading = true
      let username = this.username
      let password = this.password
      var self = this;      
     
      // If the response is succesfull (and a valid invite code)
      let webhookCode = Math.random().toString(36).substring(7);
      this.$Amplify.Auth.signUp({
        'username': this.username,
        'password': this.password,
        'attributes': {
          'custom:webhook_code': webhookCode
        }
      }).then(function(user) {
        self.$snotify.success('Sign up succesfull!', 'Check your email for an confirmation!');
        self.signupStatus = 'verify'
        this.loading = false
      }).catch(err => {
        if (err.message) {
          const message = err.message
          if (message.indexOf("Member must have length greater") !== -1) {
            this.$snotify.error('The password is not long enough.', 'Invalid password');
          }
          if (message.indexOf("Password not long enough") !== -1){
            this.$snotify.error('The password is not long enough.', 'Invalid password');
          }
          if (message.indexOf("Password must have uppercase characters") !== -1){
            this.$snotify.error('The password must have uppercase characters.', 'Invalid password');
          }
          if (message.indexOf("An account with the given email already exists.") !== -1){
            this.$snotify.warning('You already have an account!', 'Account exists');
          }
          if (message.indexOf("Password must have numeric characters") !== -1){
            this.$snotify.error('The password must have numeric characters.', 'Invalid password');
          }   
        } else {
          this.$snotify.error('Something went wrong!', 'Uh oh..');
        }
        this.loading = false
      });
    }
  }
}
</script>

<style>
  label {
    font-weight: 500
  }
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.2s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
