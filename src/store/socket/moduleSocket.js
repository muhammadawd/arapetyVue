/*=========================================================================================
  File Name: moduleAdmin.js
  Description: Admin Module
==========================================================================================*/


import state from './moduleSocketState.js'
import mutations from './moduleSocketMutations.js'
import actions from './moduleSocketActions.js'
import getters from './moduleSocketGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}
