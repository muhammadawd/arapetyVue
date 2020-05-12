/*=========================================================================================
  File Name: moduleCaptainMutations.js
  Description: Captain Module Mutations
==========================================================================================*/


export default {
  ADD_CAPTAIN(state, item) {
    state.captains.unshift(item)
  },
  SET_CAPTAINS(state, captains) {
    state.captains = captains
  },
  UPDATE_CAPTAIN(state, captain) {
    const captainIndex = state.captains.findIndex((c) => c.id == captain.id);
    Object.assign(state.captains[captainIndex], captain)
  },
  REMOVE_CAPTAIN(state, itemId) {
    const ItemIndex = state.captains.findIndex((c) => c.id == itemId)
    state.captains.splice(ItemIndex, 1)
  },
}
