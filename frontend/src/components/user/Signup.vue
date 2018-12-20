<template>
  <div class="container">
    <div class="col-md-4 offset-md-4" style="padding-top: 100px">
    
      <div class="card shadow-lg bg-light mb-3">
        <div class="card-header">Personalstats (signup)</div>

        <div v-if="signupStatus === 'signup'" class="card-body">
          <form>
      
            <div class="form-group">
              <label for="">Invite Code</label>
              <input type="text" class="form-control" v-model="inviteCode" placeholder="Invite Code">
            </div>
          
            <div class="form-group">
              <label for="">Email</label>
              <input type="text" autocomplete="username" class="form-control" v-model="username" placeholder="your@email.com">
            </div>

            <div class="form-group">
              <label for="">Password</label>
              <input type="password" autocomplete="current-password" class="form-control" v-model="password" placeholder="">
            </div>

            <router-link :to="{'name': 'login'}" class="btn btn-outline-dark">&laquo; Back to Login</router-link>

            <button 
              :disabled='loading'
              @click.prevent="signUp" 
              data-loading-text="Loading..."
              type="submit" 
              id="signup-button"
              class="btn float-right btn-primary">
                <span v-if="loading">
                  Loading..
                </span>
                <span v-else>
                  Signup
                </span>
            </button>

          </form>
        </div>

        <div v-if="signupStatus === 'verify'" class="card-body">
          <p>Please confirm your email-address. After confirming you are good to go!</p>

          <router-link :to="{'name': 'login'}" class="btn btn-outline-dark">&laquo; Back to Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data: () => {
    return {
      user: undefined,
      username: '',
      password: '',
      inviteCode: '',
      signupStatus: 'signup',
      loading: false
    }
  },
  methods: {
    signUp () {
      this.loading = true
      let username = this.username
      let password = this.password

      var self = this;      
      this.$http.get('https://h2s4qel6va.execute-api.us-east-1.amazonaws.com/api/signup/invite', 
            {
              'params': {
                'invite': this.inviteCode
              }
            }
        ).then(response => {
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
        }).catch(err => {
          this.$snotify.error('Uh oh, it seems like an invalid invite code!', 'Invalid code');
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
