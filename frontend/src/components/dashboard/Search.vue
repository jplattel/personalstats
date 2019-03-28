<template>
  <div id="page">

    <h1 class="display-4">Search</h1>

    <div v-if="!sessionId" class="alert alert-danger" role="alert">
      Workflowy is currently <strong>not</strong> connected. <router-link :to="{'name': 'settings'}">Connect again?</router-link>
    </div>
    
    <!-- If a rootnode is cached in localstorage -->
    <div v-if="rootNode.length !== 0">

      <!-- Search box -->
      <div class="input-group" id="search">
        <input class="form-control" type="text" v-on:input="filterNodes()" v-model="search" placeholder="Write a query to search or graph...">
        <div class="input-group-prepend">
          <select v-model="cardMethod" class="custom-select" id="inputGroupSelect03" aria-label="Example select with button addon">
            <option value="" selected>Choose an action</option>
            <option disabled>────────────</option>
            <option value="count">Count Items</option>
            <option disabled>────────────</option>
            <option value="sum">Sum found numbers</option>
            <option value="average">Average found numbers</option>
            <option disabled>────────────</option>
            <option value="list">Concatenate to a single list</option>
            <option value="list-children">Show children (limit 10)</option>
            <option disabled>────────────</option>
            <option value="count-chart">Count (bar chart of the last 30 days)</option>
            <option value="sum-chart">Sum (bar chart of the last 30 days)</option>
          </select>
        </div>
        <div class="input-group-append">
        <button class="btn btn-primary btn-outline-primary" @click="createCard">Create Tile</button>
        </div>
      </div>

      <!-- Render the item tree, but only when not searching -->
      <ul v-if="searchResults.length === 0 && search.length === 0">
        <node v-for="node in rootNode" :key="node.uuid" :node="node" :children="true"></node>
      </ul>

      <!-- Search results, flattened to a single list -->
      <ul v-if="searchResults.length > 0">
        <node v-for="node in searchResults" :key="node.uuid" :node="node" :children="false"></node>
      </ul>

    </div>

    <a class="btn btn-outline-primary" @click="getWorkflowyNodes">Refresh from Workflowy</a>

    <!-- Loader -->
    <div v-if="loading" class="text-center">
      <p class="font-weight-light"><span class="loading earth"></span> <em>Loading items</em>..</p>
    </div>

  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import Node from '@/components/dashboard/Node'
import Mark from 'mark.js'
import uuidv4 from 'uuid'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Dashboard',
  data: () => {
    return {
      loading: true,
      user: undefined,
      rootNode: [],
      search: '',
      searchResults: [],
      cardMethod: '',
    }
  },
  components:{
    Node
  },
  methods: {
    filterNodes () {
      if (this.search === '') {
        this.clearSearch()
      } else {
        this.searchResults = this.searchNodes(this.search)
      }
    },
    clearSearch () {
      this.searchResults = []
    },
    getWorkflowyNodes () {
      let auth_payload = { body: { "session_id": this.sessionId } }
      this.$Amplify.API.post("personalstats", '/workflowy/data', auth_payload).then(response => {
        // Store the session ID.
        response.map(node => node.source = 'workflowy')
        this.rootNode.concat(response)
        this.$store.commit('addNodes', response)
        this.$snotify.success('Synced with Workflowy!')
      }).catch(error => {
        // Notify the user
        this.$snotify.error('Uh oh, cannot authenticate with Workflowy')
        console.log(error)
      });
    },
    getNodes() {
      this.rootNode = this.$store.state.nodes
      this.loading = false
    },
    createCard() {
      if (this.search && this.cardMethod) {
        let card = {
          'uuid': uuidv4(),
          'search': this.search,
          'method': this.cardMethod
        }
        this.$store.commit('setCard', card)
        // this.$Amplify.API.post("personalstats", '/cards', {'body': card})
        this.$snotify.success('Navigating to the dashboard', 'Card added!')
        this.$router.push('/')
      }
    }
  },
  computed: {
    ...mapGetters(['searchNodes']),
    ...mapState(['sessionId'])
  },
  watch: {
    '$route': 'getNodes'
  },
  created () {
    // On next tick as seen here: https://vuejs.org/v2/api/#mounted
    this.$nextTick(function () {
      this.getNodes()
    })
  }
}
</script>

<style>
  #search{
    padding-bottom: 15px;
  }
  .mark-hashtag{
    background: orange;
    color: black;
  }
  .mark-number{
    background: green;
    color: black;
  }

</style>
