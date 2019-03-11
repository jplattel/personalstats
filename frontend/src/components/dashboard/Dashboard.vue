<template>
  <div id="page">

    <h1 class="display-4">Dashboard</h1>
    
    <div v-if="!sessionId" class="alert alert-danger" role="alert">
      Workflowy is currently <strong>not</strong> connected. <router-link :to="{'name': 'settings'}">Connect again?</router-link>
    </div>
    
    
    <card class="col-md-4" v-for="card in cards" :card="card" :key="card.uuid"/>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Card from '@/components/cards/Card'

export default {
  name: 'Dashboard',
  components: {
    Card,
  },
  computed: mapState({
    cards: state => state.cards,  
    sessionId: state => state.sessionId,  
  }),
}
</script>

<style>
  #page{
    padding-left: 30px;
    padding-right: 30px;
  }
</style>
