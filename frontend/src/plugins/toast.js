// Notification lib
import Vue from 'vue'
import Snotify from 'vue-snotify';

Vue.use(Snotify, {
  toast: {
    timeout: 2000,
    showProgressBar: false
  }
})
