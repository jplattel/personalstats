<template>
  <div class="modal fade" id="workflowyLogin" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-md" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Login to Workflowy</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Don't worry, we won't save you email or password, but we will save a <code>session ID</code> that will let us access data from Workflowy.</p>
          <form>
            <div class="form-group">
              <label for="">Email</label>
              <input type="text" autocomplete="username" class="form-control" v-model="username" placeholder="email@email.com">
            </div>
            <div class="form-group">
              <label for="">Password</label>
              <input type="password" autocomplete="current-password" class="form-control" v-model="password" placeholder="">
            </div>
          </form>

          <hr>

          <form>
            <p>If you don't want to supply your login, you can also get your session token from local storage.</p>
            <div class="form-group">
              <label for="session_id">Session ID</label>
              <input class="form-control" type="text" v-model="sessionId" placeholder="Session ID">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button v-if="!sessionId" type="button" class="btn btn-primary float-right" @click="workflowyLogin">Login with Worklowy</button>
          <button v-if="sessionId" type="button" class="btn btn-primary float-right" @click="workflowySetSessionId">Add session id</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'WorkflowyLogin',
  data() {
    return {
      username: '',
      password: '',
      sessionId: null
    }
  },
  methods: {
    async workflowySetSessionId () {
      let user = await this.$Amplify.Auth.currentAuthenticatedUser();
      let result = this.$Amplify.Auth.updateUserAttributes(user, {
        'custom:session_id': this.sessionId
      }).then(response => {
        $('#workflowyLogin').modal('hide')
        this.$snotify.success('Added session ID')
      }).catch(error => {
        // Notify the user
        this.$snotify.error('Uh oh, cannot store workflowy token..')
        console.log(error)
      });
    },
    workflowyLogin () {
      let payload = {
            body: {
              "username": this.username,
              "password": this.password
            }
          }
  
      this.$Amplify.API.post("personalstats", '/workflowy/login', payload).then(async response => {
          // Store the session ID.
          this.$store.commit('setSessionId', response.session_id)
          let user = await this.$Amplify.Auth.currentAuthenticatedUser();
          let result = this.$Amplify.Auth.updateUserAttributes(user, {
            'custom:session_id': response.session_id
          }).then(response => {
            $('#workflowyLogin').modal('hide')
            this.$snotify.success('Logged in with Workflowy')
          }).catch(error => {
            // Notify the user
            this.$snotify.error('Uh oh, cannot store workflowy token..')
            console.log(error)
          });

        }).catch(error => {
          // Notify the user
          this.$snotify.error('Uh oh, cannot authenticate with Workflowy')
          console.log(error)
        });
    }
  }
}
</script>