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
    nodes: null,
    cards: []
  },
  getters: {
    searchNodes: (state) => (query) => {
      function search(node, query, results) {
        // This node
        if (node.name && node.name.indexOf(query) !== -1) {
          results.push(node)
        } // And its children
        if (node.children) {
          node.children.forEach(child => {
            results.concat(search(child, query, results))
          });
        }
        return results
      }
      let results = []
      if (state.nodes) {
        return search(state.nodes, query, results)      
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
    logout(state) {
      state.user = null
      state.sessionId = null
      state.nodes = null
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