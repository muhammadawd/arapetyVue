import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex);

import moduleAuth from './auth/moduleAuth.js'
import moduleCommon from './common/moduleCommon.js'
import moduleCaptain from './captain/moduleCaptain.js'
import moduleVehicle from './vehicle/moduleVehicle.js'
import moduleCoupon from './coupon/moduleCoupon.js'

export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    moduleAuth: moduleAuth,
    moduleCommon: moduleCommon,
    moduleCaptain: moduleCaptain,
    moduleVehicle: moduleVehicle,
    moduleCoupon: moduleCoupon,
  },
  strict: process.env.NODE_ENV !== 'production'
})
