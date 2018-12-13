import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/user/Login.vue'
import Signup from '@/components/user/Signup.vue'
import Logout from '@/components/user/Logout.vue'
import Search from '@/components/dashboard/Search.vue'
import Dashboard from '@/components/dashboard/Dashboard.vue'
import CardView from '@/components/cards/CardView.vue'
import Settings from '@/components/dashboard/Settings.vue'

import * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue';
import store from '@/store';

Vue.use(Router)
Vue.use(AmplifyPlugin, AmplifyModules);

let user;

// Utility function to get the current user..
function getUser() {
  return Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then((data) => {
    if (data && data.signInUserSession) {
      store.commit('setUser', data.username);
      return data;
    } 
  }).catch((e) => {
    console.log(e)
    store.commit('setUser', null);
    return null
  });
}

const routes = [
  { 
    name: 'dashboard',
    path: '/', 
    component: Dashboard,
    meta: { requiresAuth: true}
  },
  { 
    name: 'cardview',
    path: '/card/:uuid', 
    component: CardView,
    meta: { requiresAuth: true}
  },
  { 
    name: 'search',
    path: '/search', 
    component: Search,
    meta: { requiresAuth: true}
  },
  { 
    name: 'settings',
    path: '/settings', 
    component: Settings,
    meta: { requiresAuth: true}
  },
  { 
    name: 'login',
    path: '/login', 
    component: Login,
  },
  { 
    name: 'logout',
    path: '/logout', 
    component: Logout,
  },
  { 
    name: 'signup',
    path: '/signup', 
    component: Signup,
  }
]

const router = new Router({
  routes, // short for `routes: routes`
  hashbang: false,
  mode: 'history',
  linkExactActiveClass: 'active',
})

// Before resolving, check if a user is logged in...
router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    user = await getUser();
    if (!user) {
      return next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        }
      });
    }
    return next()
  }
  return next()
})

export default router
