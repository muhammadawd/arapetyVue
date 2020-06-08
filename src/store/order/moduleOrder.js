/*=========================================================================================
  File Name: moduleAdmin.js
  Description: Admin Module
==========================================================================================*/


import state from './moduleOrderState.js'
import mutations from './moduleOrderMutations.js'
import actions from './moduleOrderActions.js'
import getters from './moduleOrderGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}
