export default {
  SET_SOCKET_CONNECTION(state, socket) {
    // state.socket = socket;
    state.connected = true;
  },
  SET_ONLINE(state, payload) {
    state.onlineUsers = payload
  }
}
