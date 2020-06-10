export default {
  initConnection({commit}, socket) {
    commit('SET_SOCKET_CONNECTION', socket)
  },
  setOnlineUsers({commit}, payload) {
    commit('SET_ONLINE', payload)
  },
}
