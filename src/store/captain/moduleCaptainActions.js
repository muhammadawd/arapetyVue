/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
  ----------------------------------------------------------------------------------------

==========================================================================================*/

import axios from "@/axios.js"
import requests from "@/requests.js"

export default {
  addCaptain({commit}, item) {
    return new Promise((resolve, reject) => {
      axios.post(requests.ADD_CAPTAINS, {item: item})
        .then((response) => {
          commit('ADD_CAPTAIN', Object.assign(item, {id: response.data.id}))
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
  updateCaptain({commit}, item) {
    return new Promise((resolve, reject) => {
      axios.post(`${requests.UPDATE_CAPTAIN}/${item.id}`, {item: item})
        .then((response) => {
          commit('UPDATE_CAPTAIN', response.data)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  removeCaptain({commit}, itemId) {
    return new Promise((resolve, reject) => {
      axios.delete(`${requests.DELETE_CAPTAINS}/${itemId}`)
        .then((response) => {
          commit('REMOVE_CAPTAIN', itemId)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
