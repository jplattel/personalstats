<template>
  <div class="container">
   
  </div>
</template>

<script>

export default {
  name: 'Logout',
  data: () => {
    return {
      user: undefined,
      username: '',
      password: ''
    }
  },
  methods: {
    signOut () {
      this.$store.commit('logout')

      this.$Amplify.Auth.signOut()
          .then(user => {
            this.$snotify.success('Logged out!');
            this.$router.push('/login')
          }).catch((err) => {
            console.log(err)
          })
    }
  },
  mounted () {
    this.signOut()
  }
}
</script>
