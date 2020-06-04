/*=========================================================================================
  File Name: moduleAdmin.js
  Description: Admin Module
==========================================================================================*/


import state from './moduleAdminState.js'
import mutations from './moduleAdminMutations.js'
import actions from './moduleAdminActions.js'
import getters from './moduleAdminGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}
