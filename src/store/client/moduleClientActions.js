import axios from "@/axios.js"
import requests from "@/requests.js"

export default {
  addClient({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(requests.ADD_USER, payload)
        .then((response) => {
          commit('ADD_USER', Object.assign(payload, {id: response.data.data.user.id}))
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchClient({commit}, filters) {
    return new Promise((resolve, reject) => {
      axios.get(requests.ALL_USER, {
        params: filters
      })
        .then((response) => {
          if (response.data.status) {
            commit('SET_USERS', response.data.data.users.data)
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  findClient({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${requests.FIND_USER}/${payload.id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updateClient({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${requests.UPDATE_USER}`, payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  removeClient({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${requests.DELETE_USER}`, payload)
        .then((response) => {
          commit('REMOVE_USER', payload.ids)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
