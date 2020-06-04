export default {
  ADD_ROLE(state, item) {
    state.roles.unshift(item)
  },
  SET_ROLES(state, roles) {
    state.roles = roles
  },
  SET_PERMISSIONS(state, permissions) {
    state.permissions = permissions
  },
  UPDATE_ROLE(state, role) {
    const roleIndex = state.roles.findIndex((c) => c.id == role.id);
    Object.assign(state.roles[roleIndex], role)
  },
  REMOVE_ROLE(state, itemId) {
    const ItemIndex = state.roles.findIndex((c) => c.id == itemId)
    state.roles.splice(ItemIndex, 1)
  },
}
