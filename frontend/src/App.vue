<template>
  <div v-bind:class="$route.path ==='/login' || $route.path ==='/signup' ?  'gradient' : ''">

    <!-- Modal -->
    <workflowy-login/>

    <!-- Nav -->
    <nav v-if="user" class="navbar navbar-expand-lg navbar-light bg-light">
      <!-- <a class="navbar-brand" href="#">Workflowy Dashboard</a> -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{'name': 'dashboard'}">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{'name': 'search'}">Search</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{'name': 'settings'}">Settings</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{'name': 'logout'}">Logout</router-link>
          </li>
        </ul>

      </div>
    </nav>

    <!-- Container -->
    <div id="app-container" class="container-fluid">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view class="view"></router-view>
        </keep-alive>
      </transition>
    </div>

    <vue-snotify />

    
    <!-- Footer -->
    <footer v-if="user" class="footer">
      <div class="container">
        <span class="text-muted"><a href="https://workflowy.com/s/personalstats-releas/LkIWJ1VqMUnncyOE">Release log</a> - Questions or ideas, bugs or something else? <a href="mailto:jsplattel+personalstats@gmail.com">Email us!</a></span>
      </div>
    </footer>

  </div>
</template>

<script>
import WorkflowyLogin from '@/components/modals/WorkflowyLogin'
import { Auth } from 'aws-amplify';
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    WorkflowyLogin
  },
  computed: mapState({
    user: state => state.user,  
  })
}
</script>

<style>
  .gradient{
    width: 100%;
    height: 100%;
    position: fixed;
    background: #0F2027;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #2C5364, #203A43, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  #app-container{
    margin-top: 15px;
  }
  /* Sticky footer styles
  -------------------------------------------------- */
  html {
    position: relative;
    min-height: 100%;
  }
  body {
    margin-bottom: 60px; /* Margin bottom by footer height */
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px; /* Set the fixed height of the footer here */
    line-height: 60px; /* Vertically center the text there */
    background-color: #f5f5f5;
    font-size: 0.8rem
  }
</style>
