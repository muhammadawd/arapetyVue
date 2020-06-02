/*=========================================================================================
  File Name: moduleBranch.js
  Description: Branch Module
==========================================================================================*/


import state from './moduleBranchState.js'
import mutations from './moduleBranchMutations.js'
import actions from './moduleBranchActions.js'
import getters from './moduleBranchGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}

