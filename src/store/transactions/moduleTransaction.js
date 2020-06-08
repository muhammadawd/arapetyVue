/*=========================================================================================
  File Name: moduleAdmin.js
  Description: Admin Module
==========================================================================================*/


import state from './moduleTransactionState.js'
import mutations from './moduleTransactionMutations.js'
import actions from './moduleTransactionActions.js'
import getters from './moduleTransactionGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}
