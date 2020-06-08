import helper from './filters/helper'

const current_branch = helper.getCurrentBranch();

export default {
  BASE: process.env.VUE_APP_API,

  REFRESH_ACCESS_TOKEN: '',
  AUTH_JWT_LOGIN_ADMIN: '/admin/login',

  COMMON_STATUS: '/common/getStatus',
  COMMON_VEHICLES: '/common/getVehicleCommon',
  COMMON_GET_ALL_SETTINGS: '/common/getSetting',
  COMMON_UPDATE_SETTINGS: '/common/updateSetting',

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
  ADD_VEHICLE_BRANDS: '/vehicle/create-brand',
  ADD_VEHICLE_MODELS: '/vehicle/create-model',

  UPLOAD_COUPONS: '/coupon/importFile',
  ADD_COUPON: '/coupon/create',
  ALL_COUPON: `/coupon`,
  FIND_COUPON: `/coupon/find`,
  UPDATE_COUPON: '/coupon/update',
  DELETE_COUPON: '/coupon/delete',

  ADD_USER: '/user/create',
  ALL_USER: `/user`,
  FIND_USER: `/user/find`,
  UPDATE_USER: '/user/update',
  DELETE_USER: '/user/delete',

  ADD_BRANCH: '/branch/create',
  ALL_BRANCH: `/branch`,
  FIND_BRANCH: `/branch`,
  UPDATE_BRANCH: '/branch/update',
  DELETE_BRANCH: '/branch/delete',

  ADD_ROLES: '/admin/role/create-update',
  ALL_ROLES: `/admin/role/${current_branch}`,
  FIND_ROLES: `/admin/role/${current_branch}`,
  UPDATE_ROLES: '/admin/role/create-update',
  DELETE_ROLES: '/admin/role/delete',
  ALL_PERMISSIONS: 'admin/role/permissions',


  ADD_ADMIN: '/admin/create',
  ALL_ADMINS: `/admin/${current_branch}`,
  FIND_ADMIN: `/admin/find/${current_branch}`,
  UPDATE_ADMIN: '/admin/update',
  DELETE_ADMIN: '/admin/delete',

  ALL_ORDERS: `/order/${current_branch}`,
  FIND_ORDER: `/order/findOrder`,
  FIND_ORDERS_DRIVER: `/order/getOrdersWithDriver/${current_branch}`,
  COLLECT_ORDERS: `/order/collectOrders/${current_branch}`,

  ALL_TRANSACTIONS: `/transaction/${current_branch}`,

}
