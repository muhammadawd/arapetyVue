import axios from "@/axios.js"
import requests from "@/requests.js"

export default {
  fetchOrders({commit}, filters) {
    return new Promise((resolve, reject) => {
      axios.get(requests.ALL_ORDERS, {
        params: filters
      })
        .then((response) => {
          if (response.data.status) {
            commit('SET_ORDERS', response.data.data.orders.data)
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  findOrder({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.get(requests.FIND_ORDER + `/${payload.id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  findOrdersWithDriverId({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.get(requests.FIND_ORDERS_DRIVER + `/${payload.driver_id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  collectOrders({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(requests.COLLECT_ORDERS + `/${payload.driver_id}`, payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
