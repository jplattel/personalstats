<template>
  <div>
    <h1 class="display-4 text-center">{{sum}}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Sum',
  props: ['search'],
  data: () => {
    return {
      sum: undefined,
      cards: []
    }
  },
  methods: {
    computeSum () {
      const number_regex = RegExp(/\b(\d+([,\.]?\d+)?)\b/g)
      let sum = 0
      
      this.cards.forEach(card => {
        let r = card.name.match(number_regex)
        if (r) {
          sum = sum + parseFloat(r[0])
        }
      });
      this.sum = sum
    }
  },
  computed: {
    ...mapGetters(['searchNodes'])
  },
  mounted () {
    this.cards = this.searchNodes(this.search)
    this.computeSum()
  }
}
</script>