import axios from "@/axios.js"
import requests from "@/requests.js"

export default {
  addVehicle({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(requests.ADD_VEHICLES, payload)
        .then((response) => {
          commit('ADD_VEHICLE', Object.assign(payload, {id: response.data.data.vehicle.id}))
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchVehicles({commit}, filters) {
    return new Promise((resolve, reject) => {
      axios.get(requests.ALL_VEHICLES, {
        params: filters
      })
        .then((response) => {
          commit('SET_VEHICLES', response.data.data.vehicles.data)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  findVehicle({commit}, filters) {
    return new Promise((resolve, reject) => {
      axios.get(requests.FIND_VEHICLES + `/${filters.id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updateVehicle({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(requests.UPDATE_VEHICLES, payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  removeVehicle({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${requests.DELETE_VEHICLES}`, payload)
        .then((response) => {
          commit('REMOVE_VEHICLE', payload.ids)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  addBrand({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(requests.ADD_VEHICLE_BRANDS, payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  addModel({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(requests.ADD_VEHICLE_MODELS, payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
