import axios from "@/axios.js"
import requests from "@/requests.js"

export default {
  addRole({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(requests.ADD_ROLES, payload)
        .then((response) => {
          commit('ADD_ROLE', Object.assign(payload, {id: response.data.data.role.id}))
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchRole({commit}, filters) {
    return new Promise((resolve, reject) => {
      axios.get(requests.ALL_ROLES, {
        params: filters
      })
        .then((response) => {
          if (response.data.status) {
            commit('SET_ROLES', response.data.data.roles.data)
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchPermission({commit}, filters) {
    return new Promise((resolve, reject) => {
      axios.get(requests.ALL_PERMISSIONS, {
        params: filters
      })
        .then((response) => {
          if (response.data.status) {
            commit('SET_PERMISSIONS', response.data.data.permissions)
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  findRole({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${requests.FIND_ROLES}/${payload.id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updateRole({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${requests.UPDATE_ROLES}`, payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  removeRole({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${requests.DELETE_ROLES}`, payload)
        .then((response) => {
          commit('REMOVE_ROLE', payload.ids)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
