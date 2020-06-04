/*=========================================================================================
  File Name: moduleCaptainGetters.js
  Description: Captain Module Getters
==========================================================================================*/


export default {
  getAllStatuses: state => state.statuses,
  getAllSettings: state => state.settings,
  getDriverStatuses: state => state.statuses['driver'],
  getOrderStatuses: state => state.statuses['order'],
  getAllVehicleBrands: state => state.vehicleBrands,
  getAllVehicleClasses: state => state.vehicleClasses,
}
