/*=========================================================================================
  File Name: moduleCoupon.js
  Description: Coupon Module
==========================================================================================*/


import state from './moduleCouponState.js'
import mutations from './moduleCouponMutations.js'
import actions from './moduleCouponActions.js'
import getters from './moduleCouponGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}

