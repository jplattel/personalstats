/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

import Vue from 'vue'
import Vuex from 'vuex'


// Lets us persist the state between refreshes
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    sessionId: null,
    nodes: [],
    cards: []
  },
  getters: {
    searchNodes: (state) => (query) => {
      // Recursive search function
      function search(nodes, query, results) {
        for (let i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          if (node.name && node.name.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
            results.push(node)
          } // And its children
          if (node.children) {
            node.children.forEach(child => {
              results.concat(search([child], query, results))
            });
          }
        }
        return results 
      }
        
      // Start searching
      if (state.nodes) {
        return search(state.nodes, query, [])
      } else {
        return []
      }
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setSessionId(state, sessionId) {
      state.sessionId = sessionId
    },
    setNodes(state, nodes) {
      state.nodes = nodes
    },
    addNodes(state, nodes) {
      state.nodes = state.nodes.concat(nodes)
    },
    removeFileNodes(state, file){
      state.nodes = state.nodes.filter(node => {
        return node.source != file.id;
      })
    },
    removeWorkflowyNodes(state){
      state.nodes = state.nodes.filter(node => {
        return node.source != 'workflowy';
      })
    },
    logout(state) {
      state.user = null
      // state.sessionId = null // We might want to keep the token for logging in next time..
      state.nodes = []
    },
    setCard(state, card) {
      state.cards.push(card)
    },
    deleteCard(state, card) {
      var cards = state.cards
      cards.splice(cards.indexOf(card), 1)
    }
  },
  plugins: [
    createPersistedState()
  ]
})

export default store