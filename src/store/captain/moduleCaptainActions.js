import axios from "@/axios.js"
import requests from "@/requests.js"

export default {
  addCaptain({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(requests.ADD_CAPTAINS, payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          commit('ADD_CAPTAIN', Object.assign(payload, {id: response.data.data.driver.id}))
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchCaptains({commit}, filters) {
    return new Promise((resolve, reject) => {
      axios.get(requests.ALL_CAPTAINS, {
        params: filters
      })
        .then((response) => {
          if (response.data.status) {
            commit('SET_CAPTAINS', response.data.data.drivers.data)
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  findCaptain({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${requests.FIND_CAPTAINS}/${payload.id}`, {item: payload})
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updateCaptain({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${requests.UPDATE_CAPTAINS}`, payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  removeCaptain({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${requests.DELETE_CAPTAINS}`, payload)
        .then((response) => {
          commit('REMOVE_CAPTAIN', payload.ids)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  setQuerySearch({commit}, payload) {
    commit('SET_QUERY_SEARCH', payload.querySearch)
  }
}
