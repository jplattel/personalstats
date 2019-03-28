<template>
  <div id="page">
    <div v-if="card && $route.params.uuid" class="tile">
      <div class="tile-header">
        {{ card.method }}: {{ card.search }} 
      </div>
      <div class="tile-body">
        <div v-if="card.method" v-bind:is="card.method" :search="card.search"></div>
      </div>
      <div class="tile-footer">
        <ul>
          <li :key="n.id" v-for="n in searchResults">{{ n.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
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
      searchResults: []
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
  methods: {
    getCard() {
      
      let card = this.$store.state.cards.filter((card) => {
        return card.uuid === this.$route.params.uuid
      })
      
      if (card.length === 0) {
        this.$snotify.danger('Returning to the dashboard', 'Uh oh, card not found!')
      } else {
        this.card = card[0]
        this.searchResults = this.searchNodes(card[0].search)
      }
      
    }
  },
  watch: {
    '$route': 'getCard'
  },
  created () {
    this.getCard()
  },
  computed: {
    ...mapGetters(['searchNodes'])
  },
}
</script>

<style>
.card{margin-bottom: 10px}
</style>
