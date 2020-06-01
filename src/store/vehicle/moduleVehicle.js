/*=========================================================================================
  File Name: moduleCaptain.js
  Description: Common Module
==========================================================================================*/


import state from './moduleVehicleState.js'
import mutations from './moduleVehicleMutations.js'
import actions from './moduleVehicleActions.js'
import getters from './moduleVehicleGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}
