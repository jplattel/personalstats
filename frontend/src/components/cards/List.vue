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
  name: 'List',
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
    this.nodes = this.searchNodes(this.search)
  }
}
</script>