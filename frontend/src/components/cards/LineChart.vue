<template>
  <div>
    test
  </div>
</template>

<script>

export default {
  name: 'LineChart',
  props: ['query'],
  data: () => {
    return {
      data: undefined,
    }
  },
  mounted () {
    console.log(this.query)
  }
}
</script>