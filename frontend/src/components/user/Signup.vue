<template>
  <div class="container">
    <div class="col-md-4 offset-md-4" style="padding-top: 200px">
    
      <div class="card shadow-lg bg-light mb-3">
        <div class="card-header">Personalstats (signup)</div>

        <div class="card-body">
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

            <input @click.prevent="signUp" type="submit" value="Signup" class="btn float-right btn-primary">

          </form>
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
    }
  },
  methods: {
    signUp () {
      let username = this.username
      let password = this.password
      
      this.$http.post('https://h2s4qel6va.execute-api.us-east-1.amazonaws.com/api/signup/invite',  {'invite_code': this.inviteCode})
        .then(response => {
          // If the response is succesfull (and a valid invite code)
          let webhookCode = Math.random().toString(36).substring(7);
          this.$Amplify.Auth.signUp({
            'username': this.username,
            'password': this.password,
            'attributes': {
              'custom:webhook_code': webhookCode
            }
          }).then(function(user) {
            this.$snotify.success('Sign up succesfull!', 'Check your email for an confirmation!');
            self.$router.push('/login')
          }).catch(err => {
            this.$snotify.error(err, 'Cannot signup');
            console.log(err)
          });
        }).catch(err => {
          console.log(err)
          this.$snotify.error('Uh oh, it seems like an invalid invite code!', 'Invalid code');
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
