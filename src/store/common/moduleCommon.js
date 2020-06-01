/*=========================================================================================
  File Name: moduleCaptain.js
  Description: Common Module
==========================================================================================*/


import state from './moduleCommonState.js'
import mutations from './moduleCommonMutations.js'
import actions from './moduleCommonActions.js'
import getters from './moduleCommonGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}

