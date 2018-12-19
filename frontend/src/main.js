import Vue from 'vue'
import App from './App.vue'

import router from '@/router'
import store from '@/store'

// Plugins
import '@/plugins/amplify'
import '@/plugins/toast'

// Vue.config.productionTip = false
import VueResource from 'vue-resource';

Vue.use(VueResource)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


