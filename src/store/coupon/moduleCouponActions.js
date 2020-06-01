import axios from "@/axios.js"
import requests from "@/requests.js"

export default {
  addCoupon({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(requests.ADD_COUPON, payload)
        .then((response) => {
          commit('ADD_COUPON', Object.assign(payload, {id: response.data.data.coupon.id}))
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchCoupon({commit}, filters) {
    return new Promise((resolve, reject) => {
      axios.get(requests.ALL_COUPON, {
        params: filters
      })
        .then((response) => {
          if (response.data.status) {
            commit('SET_COUPONS', response.data.data.coupons.data)
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  findCoupon({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${requests.FIND_COUPON}/${payload.id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updateCoupon({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${requests.UPDATE_COUPON}`, payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  removeCoupon({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${requests.DELETE_COUPON}`, payload)
        .then((response) => {
          commit('REMOVE_COUPON', payload.ids)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
