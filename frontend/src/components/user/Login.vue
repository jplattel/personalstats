<template>
  <div class="container">
    <div class="col-md-4 offset-md-4" style="padding-top: 100px">
      
      <div class="card shadow-lg bg-light mb-3">
        <div class="card-header">
          Personalstats (login)
        </div>

        <div class="card-body">
          <form>
            <div class="form-group">
              <label for="">Email</label>
              <input type="text" autocomplete="username" class="form-control" v-model="username" placeholder="your@email.com">
            </div>
            <div class="form-group">
              <label for="">Password</label>
              <input type="password" autocomplete="current-password" class="form-control" v-model="password" placeholder="">
            </div>
            <router-link :to="{'name': 'signup'}" class="btn btn-outline-dark">Sign Up</router-link>
            <input @click.prevent="signIn" type="submit" value="Login" class="btn float-right btn-primary">
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
      password: ''
    }
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

<style>
  label {
    font-weight: 500;
  }
</style>
