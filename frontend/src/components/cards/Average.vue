<template>
  <div>
    <h1 class="display-4 text-center">{{average}}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Average',
  props: ['search'],
  data: () => {
    return {
      average: undefined,
      nodes: []
    }
  },
  methods: {
    computeSum () {
      const number_regex = RegExp(/\b(\d+[\,\.]?\d+)\b/g)
      let sum = 0      
      this.node.forEach(node => {
        let r = node.name.match(number_regex)
        if (r) {
          sum = sum + parseFloat(r[0])
        }
      });
      this.average = (sum / this.nodes.length).toFixed(2)
    }
  },
  computed: {
    ...mapGetters(['searchNodes'])
  },
  mounted () {
    this.nodes = this.searchNodes(this.search)
    this.computeSum()
  }
}
</script>