/*=========================================================================================
  File Name: moduleCaptainMutations.js
  Description: Captain Module Mutations
==========================================================================================*/


export default {
  ADD_COUPON(state, item) {
    state.coupons.unshift(item)
  },
  SET_COUPONS(state, coupons) {
    state.coupons = coupons
  },
  UPDATE_COUPON(state, coupon) {
    const couponIndex = state.coupons.findIndex((c) => c.id == coupon.id);
    Object.assign(state.coupons[couponIndex], coupon)
  },
  REMOVE_COUPON(state, itemId) {
    const ItemIndex = state.coupons.findIndex((c) => c.id == itemId)
    state.coupons.splice(ItemIndex, 1)
  },
}
