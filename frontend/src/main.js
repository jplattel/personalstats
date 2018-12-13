import Vue from 'vue'
import App from './App.vue'

import router from '@/router'
import store from '@/store'

// Plugins
import '@/plugins/amplify'
import '@/plugins/toast'

// Vue.config.productionTip = false
import VueResource from 'vue-resource';

Vue.use(VueResource);

console.log("region", process.env.VUE_APP_AWS_REGION)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


