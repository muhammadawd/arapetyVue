/*=========================================================================================
  File Name: moduleCaptainGetters.js
  Description: Captain Module Getters
==========================================================================================*/


export default {
  getCaptainById: state => (captainId) => state.captains.find((captain) => captain.id == captainId),
  getAllCaptains: state => state.captains,
}
