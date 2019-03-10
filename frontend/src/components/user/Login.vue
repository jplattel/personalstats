<template>
  <div class="col-sm-12 col-md-6 col-lg-3 col-lg-2">

    <white-logo viewBox="0 0 300 200" />
    <!-- <input type="text" v-model="username"> -->
    <form-input label="Email" v-model="username"></form-input>

    <form-input label="Password" v-model="password" type="password"></form-input>

    <div style="margin-top: 40px;">
      <form-button :class="['float-left', 'light']">
        <router-link :to="{'name': 'signup'}">Sign Up</router-link>
      </form-button>
      
      <form-button :class="['float-right', 'light']">
        <a href="" @click.prevent="signIn">Login &raquo;</a>
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
      password: ''
    }
  },
  components: {
    FormButton,
    FormInput,
    WhiteLogo
  },
  methods: {
    signIn () {
      let self = this;
      this.$Amplify.Auth.signIn(this.username, this.password)
          .then(user => {
            this.$snotify.success('Succesfully signed in!');
            self.user = user
            self.$router.push('/')
          })
          .catch(err => {
            this.$snotify.error('We can\'t seem to log you in', 'Uh oh..');
            console.log(err)
          });
    },
    signOut () {
      this.user = undefined
      this.$Amplify.Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
  }
}
</script>
