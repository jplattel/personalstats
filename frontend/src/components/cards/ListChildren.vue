<template>
  <div>
    <ul>
      <li v-for="node in nodes" :key="node.name">{{ node.name }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ListChildren',
  props: ['search'],
  data: () => {
    return {
      nodes: [],
    }
  },
  computed: {
    ...mapGetters(['searchNodes'])
  },
  mounted () {  
    this.nodes = this.searchNodes(this.search)[0].children.slice(0,10)
  }
}
</script>