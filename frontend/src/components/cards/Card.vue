<template>
    <div>
      <div class="tile">
        <div class="tile-header">
          <router-link :to="{ name: 'cardview', params: { uuid: card.uuid }}">{{ card.method }}: {{card.search}} </router-link>
          <button @click="deleteCard" type="button" class="close" aria-label="Close">
            <span aria-hidden="true" class="tile-delete">&times;</span>
          </button>
        </div>
        <div class="tile-body">
          <div v-if="card.method" v-bind:is="card.method" :search="card.search"></div>
        </div>
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
  name: 'Card',
  props: ['card'],
  components: {
    Average,
    Sum,
    Count,
    List,
    ListChildren,
    CountChart,
    SumChart,
  },
  methods: {
    deleteCard () {
      this.$store.commit('deleteCard', this.card)
    }
  }
}
</script>

<style>
  .tile{
    /* margin-left: 5px;
    margin-right: 5px; */
    width: 100%;
    margin-bottom: 10px;
    /* box-shadow: 0px 0px 10px 1px #4c4c4c; */
    border: 2px solid #4c4c4c;
    float: left;
    border-radius: 7px;
    padding: 20px;
  }
  .tile-header{
    display: block;
    width: 100%;
    text-align: center;
  }
  .tile-header a{
    color: #4c4c4c;
  }
  .tile-body{
    width: 100%; 
  }
</style>
