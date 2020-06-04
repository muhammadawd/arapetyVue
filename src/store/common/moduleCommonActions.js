import axios from "@/axios.js"
import requests from "@/requests.js"

export default {
  fetchStatuses({commit}, filters) {
    return new Promise((resolve, reject) => {
      axios.get(requests.COMMON_STATUS, {
        params: filters
      })
        .then((response) => {
          if (response.data.status) {
            commit('SET_STATUSES', response.data.data.status)
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchSettings({commit}, filters) {
    return new Promise((resolve, reject) => {
      axios.get(requests.COMMON_GET_ALL_SETTINGS, {
        params: filters
      })
        .then((response) => {
          if (response.data.status) {
            commit('SET_SETTINGS', response.data.data.settings)
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchVehicleCommon({commit}, filters) {
    return new Promise((resolve, reject) => {
      axios.get(requests.COMMON_VEHICLES, {
        params: filters
      })
        .then((response) => {
          if (response.data.status) {
            let brands = [];
            brands = response.data.data.vehicleBrands;
            _.forEach(brands, (brand) => {
              _.map(brand.models, (model) => {
                let obj;
                obj = model;
                obj.image = brand.image_path.path;
                model = obj;
              })
            })
            commit('SET_VEHICLES_BRANDS', brands);
            commit('SET_VEHICLES_CLASSES', response.data.data.vehicleClasses);
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updateSetting({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(requests.COMMON_UPDATE_SETTINGS, payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
