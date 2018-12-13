import Vue from 'vue'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: process.env.VUE_APP_AWS_REGION,
    userPoolId: process.env.VUE_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.VUE_APP_COGNITO_USER_POOL_APP_CLIENT_ID,
    identityPoolId: process.env.VUE_APP_COGNITO_IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: process.env.VUE_APP_CHALICE_ENDPOINT_NAME,
        endpoint: process.env.VUE_APP_CHALICE_ENDPOINT,
        custom_header: async () => { // For cognito user pools:
          return { 
            'Authorization': (await Auth.currentSession()).idToken.jwtToken,
            'Content-Type': 'application/json'
          } 
        }
      }
    ]
  }
})

Vue.use(AmplifyPlugin, AmplifyModules)