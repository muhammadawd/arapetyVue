import axios from "@/axios.js"
import requests from "@/requests.js"

export default {
  addAdmin({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(requests.ADD_ADMIN, payload)
        .then((response) => {
          commit('ADD_ADMIN', Object.assign(payload, {id: response.data.data.admin.id}))
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchAdmin({commit}, filters) {
    return new Promise((resolve, reject) => {
      axios.get(requests.ALL_ADMINS, {
        params: filters
      })
        .then((response) => {
          if (response.data.status) {
            commit('SET_ADMINS', response.data.data.admins.data)
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  findAdmin({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${requests.FIND_ADMIN}/${payload.id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updateAdmin({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${requests.UPDATE_ADMIN}`, payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  removeAdmin({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${requests.DELETE_ADMIN}`, payload)
        .then((response) => {
          commit('REMOVE_ADMIN', payload.ids)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
