export default {
  ADD_BRANCH(state, item) {
    state.branches.unshift(item)
  },
  SET_BRANCHES(state, branches) {
    state.branches = branches
  },
  UPDATE_BRANCH(state, branch) {
    const branchIndex = state.branches.findIndex((c) => c.id == branch.id);
    Object.assign(state.branches[branchIndex], user)
  },
  REMOVE_BRANCH(state, itemId) {
    const ItemIndex = state.branches.findIndex((c) => c.id == itemId)
    state.branches.splice(ItemIndex, 1)
  },
}
