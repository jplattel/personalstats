<template>
  <div>
    <div v-if="!sessionId" class="alert alert-danger" role="alert">
      Workflowy is currently <strong>not</strong> connected. <router-link :to="{'name': 'settings'}">Connect again?</router-link>
    </div>

    <h1 class="display-4">Dashboard</h1>

    <div class="row">
      <div class="card-columns">
        <card v-for="card in cards" :card="card" :key="card.uuid"/>
      </div>
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
  }),
}
</script>