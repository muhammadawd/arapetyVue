export default {
  ADD_USER(state, item) {
    state.users.unshift(item)
  },
  SET_USERS(state, users) {
    state.users = users
  },
  UPDATE_USER(state, user) {
    const userIndex = state.users.findIndex((c) => c.id == user.id);
    Object.assign(state.users[userIndex], user)
  },
  REMOVE_USER(state, itemId) {
    const ItemIndex = state.users.findIndex((c) => c.id == itemId)
    state.users.splice(ItemIndex, 1)
  },
}
