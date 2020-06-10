/*=========================================================================================
  File Name: moduleCaptainGetters.js
  Description: Captain Module Getters
==========================================================================================*/


export default {
  isConnected: state => state.connected,
  getSocket: state => state.socket,
  getOnlineUsers: state => state.onlineUsers,
}
