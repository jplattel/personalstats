import Vue from 'vue'
import App from './App.vue'

import router from '@/router'
import store from '@/store'
import db from '@/db'

// Plugins
import '@/plugins/amplify'
import '@/plugins/toast'

import * as Sentry from '@sentry/browser'
import VueResource from 'vue-resource';

Vue.use(VueResource)

Sentry.init({
  dsn: 'https://6e7c3113ba9c4d3db58179cb601a7274@sentry.io/1361551',
  integrations: [new Sentry.Integrations.Vue({ Vue })]
})

new Vue({
  router,
  store,
  db,
  render: h => h(App),
}).$mount('#app')


