/*=========================================================================================
  File Name: moduleCaptainMutations.js
  Description: Captain Module Mutations
==========================================================================================*/


export default {
  SET_VEHICLES(state, vehicles) {
    state.vehicles = vehicles
  },
  ADD_VEHICLE(state, item) {
    state.vehicles.unshift(item)
  },
  UPDATE_VEHICLE(state, vehicle) {
    const vehicleIndex = state.vehicles.findIndex((c) => c.id == vehicle.id);
    Object.assign(state.vehicles[vehicleIndex], vehicle)
  },
  REMOVE_VEHICLE(state, itemId) {
    const ItemIndex = state.vehicles.findIndex((c) => c.id == itemId)
    state.vehicles.splice(ItemIndex, 1)
  },
}
