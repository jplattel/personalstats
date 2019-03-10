<template>
  <nav class="navigation">

    <!-- <div class="col-md-12"> -->

    <!-- <black-logo viewBox="0 0 100 100" style="width: 150px;"/> -->

    <form-button-group class="float-left">
      <form-button :class='["dark"]'>
        <router-link :to="{'name': 'dashboard'}">Dashboard</router-link>
      </form-button>
      <form-button :class='["dark"]'>
        <router-link :to="{'name': 'search'}">Search</router-link>
      </form-button>
      <form-button :class='["dark"]'>
        <router-link :to="{'name': 'search'}">Sources</router-link>
      </form-button>
    </form-button-group>

    <form-button-group class="float-right">
      <form-button :class='["dark"]'>
        <router-link :to="{'name': 'settings'}">Settings</router-link>
      </form-button>
      <form-button :class="['dark']">
        <router-link :to="{'name': 'logout'}">Logout</router-link>
      </form-button>
    </form-button-group>
    
    <!-- </div> -->
  </nav>
</template>

<script>
import FormButtonGroup from '@/components/FormButtonGroup'
import FormButton from '@/components/FormButton'
import FormInput from '@/components/FormInput'
import BlackLogo from '@/assets/img/logo_black.svg';

export default {
  name: 'Navigation',
  data: () => {
    return {}
  },
  components: {
    FormButton,
    FormButtonGroup,
    BlackLogo,
  },
}
</script>

<style>
  .navigation{
    height: 80px;
    padding: 20px;
  }
</style>
