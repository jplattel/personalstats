import Vue from 'vue'
import VueIdb from 'vue-idb'

Vue.use(VueIdb)

export default new VueIdb({
  database: 'personalstats',
  schemas: [
    { files: 'id, label, content, created_at, updated_at' }
  ]
})