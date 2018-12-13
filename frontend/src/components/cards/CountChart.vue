<template>
  <div>
    <bar-chart :height="150" :chart-data="chartData" :options="options"></bar-chart>
  </div>
</template>

<script>
import BarChart from '@/components/charts/BarChart.js'
import { mapGetters } from 'vuex'

export default {
  components: {
    BarChart
  },
  props: ['search'],
  data: () => {
    return {
      chartData: null,
      nodes: [],
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks: {
              display: false //this will remove only the label
            }
          }],
        }
      }
    }
  },
  computed: {
    ...mapGetters(['searchNodes'])
  },
  methods: {
    setGraphData () {
      var today = new Date()

      // Fill X
      let x = []
      for (let index = 0; index < 31; index++) {
        x.push(new Date(new Date().setDate(today.getDate()-index)).toISOString()  )
      }

      // Fill y
      let y = []
      x.forEach(date => {
        let dateCount = this.nodes.filter((node) => {
          return new Date(node.last_modified) <= new Date(date)
        }).length
        y.push(dateCount)
      });
      
      this.chartData = {
        labels: x.reverse(),
        datasets: [
          {
            // label: "Count " + this.search,
            backgroundColor: '#93B7FF',
            borderColor: "#739DF1",
            data: y.reverse() 
          }
        ]
      }
    },
  },
  mounted () {
    this.nodes = this.searchNodes(this.search)
    this.setGraphData()
  },
}
</script>