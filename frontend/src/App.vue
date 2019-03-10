<template>
  <div v-bind:class="$route.path ==='/login' || $route.path ==='/signup' ?  'gradient' : ''">

      <!-- Modal -->
      <workflowy-login v-if="user" />

      <!-- Container -->
      <div id="app-container" class="container-fluid">
        <!-- Nav -->
        <navigation v-if="user"/>

        <!-- View -->
        <transition name="fade" mode="out-in">
          <keep-alive>
            <router-view class="view" />
          </keep-alive>
        </transition>
      </div>

      <vue-snotify />

    <div v-if="user"> 
      <!-- Footer -->
      <footer class="footer">
        <div class="container">
          <span class="text-muted">
            <a href="https://blog.personalstats.nl">Blog</a> | 
            <a href="https://workflowy.com/s/personalstats-releas/LkIWJ1VqMUnncyOE">Release log</a> - Questions or ideas, bugs or something else? <a href="mailto:jsplattel+personalstats@gmail.com">Email us!</a>
          </span>
        </div>
      </footer>
    </div>

  </div>
</template>

<script>
import WorkflowyLogin from '@/components/modals/WorkflowyLogin'
import Navigation from '@/components/Navigation'
import { Auth } from 'aws-amplify';
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    WorkflowyLogin,
    Navigation
  },
  computed: mapState({
    user: state => state.user,  
  })
}
</script>

<style>

  @import url('https://fonts.googleapis.com/css?family=Montserrat:200,400');

  .gradient{
    width: 100%;
    min-height: 600px;
    height: 100%;
    position: fixed;
    background: url('./assets/img/bg_blurred.jpg');
    background-size: cover;
    background-repeat: no-repeat;
  }
  /* #app-container{
    margin-top: 15px;
  } */
  /* Sticky footer styles
  -------------------------------------------------- */
  html {
    position: relative; 
    height: 100%
  }
  body {
    margin-bottom: 60px; /* Margin bottom by footer height */
    font-family: 'Montserrat', sans-serif;
    
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
