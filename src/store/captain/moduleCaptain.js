/*=========================================================================================
  File Name: moduleCaptain.js
  Description: Captain Module
==========================================================================================*/


import state from './moduleCaptainState.js'
import mutations from './moduleCaptainMutations.js'
import actions from './moduleCaptainActions.js'
import getters from './moduleCaptainGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}

