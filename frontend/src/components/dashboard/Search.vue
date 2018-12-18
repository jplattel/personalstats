<template>
  <div>

    <div v-if="!sessionId" class="alert alert-danger" role="alert">
      Workflowy is currently <strong>not</strong> connected. <router-link :to="{'name': 'settings'}">Connect again?</router-link>
    </div>
    
    <!-- If a rootnode is cached in localstorage -->
    <div v-else-if="rootNode && sessionId">

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
        <button class="btn btn-primary btn-outline-primary" @click="createCard">Create Card</button>
        </div>
      </div>

      <!-- Render the item tree, but only when not searching -->
      <ul v-if="searchResults.length === 0"><node :node="rootNode" :children="true"></node></ul>

      <!-- Search results, flattened to a single list -->
      <ul v-if="searchResults.length > 0">
        <node v-for="node in searchResults" :key="node.uuid" :node="node" :children="false"></node>
      </ul>

      <a @click="getWorkflowyData">Refresh from Workflowy</a>

    </div>

    <!-- Loader -->
    <div v-else class="text-center">
      <p class="font-weight-light"><span class="loading earth"></span> <em>Loading items from Workflowy</em>..</p>
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
      user: undefined,
      rootNode: undefined,
      search: '',
      searchResults: [],
      cardMethod: ''
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
    getWorkflowyData () {
      let auth_payload = { body: { "session_id": this.sessionId } }
      this.$Amplify.API.post("personalstats", '/workflowy/data', auth_payload).then(response => {
        // Store the session ID.
        this.rootNode = response.children[0]
        this.$store.commit('setNodes', response.children[0])
        this.$snotify.success('Synced with Workflowy!')
      }).catch(error => {
        // Notify the user
        this.$snotify.error('Uh oh, cannot authenticate with Workflowy')
        console.log(error)
      });
    },
    createCard() {
      if (this.search && this.cardMethod) {
        this.$store.commit('setCard', {
          'uuid': uuidv4(),
          'search': this.search,
          'method': this.cardMethod
        })
        this.$snotify.success('Navigating to the dashboard', 'Card added!')
        this.$router.push('/')
      }
    }
  },
  computed: {
    ...mapGetters(['searchNodes']),
    ...mapState(['sessionId'])
  },
  mounted () {
    
    // If no nodes, fetch from Workflowy
    if (!this.$store.state.nodes) {
      // Check if a workflowy ID is existing...
      if (!this.$store.state.sessionId) {
        this.$snotify.warning('You will need to sign in to workflowy');
      } else {
        console.log("Getting data from Workflowy")
        this.getWorkflowyData() 
      }
    } else {
      this.rootNode = this.$store.state.nodes
    }

    // Fetch the cards the user has configured...
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
