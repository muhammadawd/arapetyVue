import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)

import moduleCaptain from './captain/moduleCaptain.js'


export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    moduleCaptain: moduleCaptain,
  },
  strict: process.env.NODE_ENV !== 'production'
})
