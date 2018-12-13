<template>
  <div>
    <h1 class="display-4 text-center">{{count}}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Count',
  props: ['search'],
  data: () => {
    return {
      count: undefined,
    }
  },
  computed: {
    ...mapGetters(['searchNodes'])
  },
  mounted () {
    this.count = this.searchNodes(this.search).length
  }
}
</script>