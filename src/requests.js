import helper from './filters/helper'

const current_branch = helper.getCurrentBranch();
// console.log(`current_branch: ${current_branch}`);

export default {
  BASE: 'http://approc.com/~approctest/arapety/api/',

  AUTH_JWT_LOGIN_ADMIN: '/admin/login',

  COMMON_STATUS: '/common/getStatus',
  COMMON_VEHICLES: '/common/getVehicleCommon',

  ADD_CAPTAINS: '/driver/create',
  ALL_CAPTAINS: `/driver/${current_branch}`,
  FIND_CAPTAINS: `/driver/find/${current_branch}`,
  UPDATE_CAPTAINS: '/driver/update',
  DELETE_CAPTAINS: '/driver/delete',

  ADD_VEHICLES: '/vehicle/create',
  ALL_VEHICLES: `/vehicle/${current_branch}`,
  FIND_VEHICLES: `/vehicle/find/${current_branch}`,
  UPDATE_VEHICLES: '/vehicle/update',
  DELETE_VEHICLES: '/vehicle/delete',

  ADD_COUPON: '/coupon/create',
  ALL_COUPON: `/coupon`,
  FIND_COUPON: `/coupon/find`,
  UPDATE_COUPON: '/coupon/update',
  DELETE_COUPON: '/coupon/delete',
}
