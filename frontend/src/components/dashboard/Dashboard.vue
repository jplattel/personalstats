<template>
  <div id="page">
    <h1 class="display-4">Dashboard</h1>
    
    <div v-if="cards.length === 0">
      <p>You have not created any tiles yet. Make some <router-link :to="{'name': 'search'}">search for things</router-link> to create them.</p>
    </div>

    <div v-else-if="cards" class="row">
      <card class="col-md-4" v-for="card in cards" :card="card" :key="card.uuid"/>
    </div>
    
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
  })
}
</script>

<style>
  #page{
    padding-left: 30px;
    padding-right: 30px;
  }
  
</style>
