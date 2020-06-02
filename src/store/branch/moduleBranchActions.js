import axios from "@/axios.js"
import requests from "@/requests.js"

export default {
  addBranch({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(requests.ADD_BRANCH, payload)
        .then((response) => {
          commit('ADD_BRANCH', Object.assign(payload, {id: response.data.data.branch.id}))
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchBranch({commit}, filters) {
    return new Promise((resolve, reject) => {
      axios.get(requests.ALL_BRANCH, {
        params: filters
      })
        .then((response) => {
          if (response.data.status) {
            commit('SET_BRANCHES', response.data.data.branches.data)
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  findBranch({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${requests.FIND_BRANCH}/${payload.id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updateBranch({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${requests.UPDATE_BRANCH}`, payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  removeBranch({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${requests.DELETE_BRANCH}`, payload)
        .then((response) => {
          commit('REMOVE_BRANCH', payload.ids)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
