export default {
  ADD_ADMIN(state, item) {
    state.admins.unshift(item)
  },
  SET_ADMINS(state, admins) {
    state.admins = admins
  },
  UPDATE_ADMIN(state, admin) {
    const adminIndex = state.admins.findIndex((c) => c.id == admin.id);
    Object.assign(state.admins[adminIndex], admin)
  },
  REMOVE_ADMIN(state, itemId) {
    const ItemIndex = state.admins.findIndex((c) => c.id == itemId)
    state.admins.splice(ItemIndex, 1)
  },
}
