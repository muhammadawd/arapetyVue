/*=========================================================================================
  File Name: moduleCaptainMutations.js
  Description: Captain Module Mutations
==========================================================================================*/


export default {
  SET_STATUSES(state, statuses) {
    state.statuses = statuses
  },
  SET_VEHICLES_BRANDS(state, brands) {
    state.vehicleBrands = brands
  },
  SET_VEHICLES_CLASSES(state, classes) {
    state.vehicleClasses = classes
  },
}
