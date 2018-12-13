<template>
  
    <div class="card">
      <div class="card-header">
        <router-link :to="{ name: 'cardview', params: { uuid: card.uuid }}">{{ card.method }}: {{card.search}} </router-link>
        <button @click="deleteCard" type="button" class="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
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
import CountChart from '@/components/cards/CountChart'
import SumChart from '@/components/cards/SumChart'

export default {
  name: 'Card',
  props: ['card'],
  components: {
    Average,
    Sum,
    Count,
    List,
    CountChart,
    SumChart
  },
  methods: {
    deleteCard () {
      this.$store.commit('deleteCard', this.card)
    }
  }
}
</script>

<style>
.card{margin-bottom: 10px}
</style>
