<template>

  <div v-if="card && $route.params.uuid" class="card">
    <div class="card-header">
      {{ card.method }}: {{ card.search }} 
    </div>
    <div class="card-body">
      <div v-if="card.method" v-bind:is="card.method" :search="card.search"></div>
    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Card from '@/components/cards/Card'

import Average from '@/components/cards/Average'
import Sum from '@/components/cards/Sum'
import Count from '@/components/cards/Count'
import List from '@/components/cards/List'
import ListChildren from '@/components/cards/ListChildren'
import CountChart from '@/components/cards/CountChart'
import SumChart from '@/components/cards/SumChart'

export default {
  name: 'CardView',
  data: () => {
    return {
      card: undefined,
    }
  },
  components: {
    Average,
    Sum,
    Count,
    List,
    CountChart,
    SumChart,
    ListChildren,
  },
  mounted () {
    console.log("uuid", this.$route.params.uuid)
    let card = this.$store.state.cards.filter((card) => {
      return card.uuid === this.$route.params.uuid
    })

    if (card.length === 0) {
      this.$snotify.danger('Returning to the dashboard', 'Uh oh, card not found!')
    } else {
      this.card = card[0]
    }
  }
}
</script>

<style>
.card{margin-bottom: 10px}
</style>
