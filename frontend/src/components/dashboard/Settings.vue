<template>
  <div id="page">
    <div class="row">
      <div class="col-md-12 col-xs-12">
        <h1 class="display-4">Settings</h1>
      </div>

      <div class="col-md-4 col-xs-12">
        <div class="tile">
          <div class="tile-header">
            FAQ
          </div> 
          <div class="tile-body">
            <p>Are things not working as they are suppose to? This small FAQ might help you out!</p>

            <ul>
              <li>
                <strong>I'm not seeing all items in Personal stats?</strong><br />
                We use a experimental unsupported Workflowy API. Which acts as a browser, 
                if you don't open all items in the workflowy web interface, we cannot see them all.
              </li>
              <li>
                <strong>The loading from Workflowy takes a long time.</strong><br />
                Try refreshing the page, this might fix some issues.
              </li>
              <li>
                <strong>I want to delete my account.</strong><br />
                Sure, let me know at: <a href="mailto:jsplattel@gmail.com">jsplattel@gmail.com</a> and I will delete it.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-4 col-xs-12">
        <div class="tile">
          <div class="tile-header">
            Workflowy
          </div> 
          <div class="tile-body">
            <div v-if="sessionId" class="alert alert-success" role="alert">
              Workflowy is <strong>connected</strong> successfully! (<a href="#" @click="disconnectWorkflowy">disconnect</a>)
            </div>

            <div v-else class="alert alert-danger" role="alert">
              Workflowy is <strong>not</strong> connected. (<a href="#" @click="connectWorkflowy">Authenticate?</a>)
            </div>
          </div>
          <div class="tile-header">
            Webhooks
          </div> 
          <div class="tile-body">
            <p>
              It is possible for you to add items to the top of you worklowy list by using webhooks 
              (this enables integration with <a href="http://ifttt.com">IFTTT</a> and <a href="https://zapier.com">Zapier</a> for example). Post to the following webhook:
            </p>

            <input class="form-control" :value="'https://api.personalstats.nl/webhook/' + webhookCode + '/' + user">
            
            <button @click="resetWebhookUrl()" style="margin-top: 10px" class="btn btn-block btn-outline-dark">Reset to a new Webhook URL</button>
          </div>
          <div class="tile-header">
            Email (<i>beta</i>)
          </div> 
          <div class="tile-body border-warning">
            <p>
              It is possible for you to add items to the top of you worklowy list by using email. 
              The title of the email will be the first line of the item in Workflowy and the email
              will be added as a note. You can use the following email-address:
            </p>

            <p>
              <input class="form-control" :value="emailCode + '-' + user + '@email.personalstats.nl'">
            </p>
            
            <a class="btn btn-block btn-outline-dark" @click="resetEmail()">Reset to a new email</a>
          </div>
        </div>
        
      </div>

    </div>
    
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';
import { mapState } from 'vuex'

export default {
  name: 'Settings',
  data: () => {
    return {
      webhookCode: '',
      emailCode: ''
    }
  },
  methods: {
    disconnectWorkflowy () {
      this.$store.commit('setSessionId', null)
      this.$snotify.warning('Workflowy disconnected');
    },
    connectWorkflowy () {
      $('#workflowyLogin').modal()
    },
    async resetWebhookUrl () {
      let webhookCode = Math.random().toString(36).substring(2)
      let user = await Auth.currentAuthenticatedUser();
      let result = await Auth.updateUserAttributes(user, {
        'custom:webhook_code': webhookCode
      }).then(response => {
        this.webhookCode = webhookCode
        this.$snotify.success('Webhook code reset!')
      })
    },
    async resetEmail () {
      let emailCode = Math.random().toString(36).substring(2)
      let user = await Auth.currentAuthenticatedUser();
      let result = await Auth.updateUserAttributes(user, {
        'custom:email_code': emailCode
      }).then(response => {
        this.emailCode = emailCode
        this.$snotify.success('Email reset!')
      })
    },
    getWebhookUrl () {
      return this.webhookCode
    }
  },
  computed:  {
    ...mapState({
      sessionId: state => state.sessionId, 
      user: state => state.user
    })
  },
  created () {
    Auth.currentAuthenticatedUser().then((user) => {
      this.webhookCode = user.attributes['custom:webhook_code']
      this.emailCode = user.attributes['custom:email_code']
      let base = 'https://api.personalstats.nl/'
      let url = base + 'webhook/' + user.attributes['custom:webhook_code'] + '/' + user.attributes['sub']
    })
  }
}
</script>

<style>
  .tile{
    margin-left: 5px;
    margin-right: 5px;
    width: 100%;
    margin-bottom: 10px;
    /* box-shadow: 0px 0px 10px 1px #4c4c4c; */
    border: 2px solid #4c4c4c;
    float: left;
    border-radius: 7px;
    padding: 20px;
  }
  .tile-header{
    font-size: 25px;
    padding-bottom: 10px;
    padding-top: 10px;
    display: block;
    width: 100%;
    text-align: center;
  }
  .tile-header a{
    color: #4c4c4c;
  }
  .tile-body{
    width: 100%; 
  }
</style>
