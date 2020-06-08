import axios from "../../../axios/index.js"
import requests from "@/requests.js"
import store from "../../../../store/store.js"

// Token Refresh
let isAlreadyFetchingAccessToken = false
let subscribers = []

function onAccessTokenFetched(access_token) {
  subscribers = subscribers.filter(callback => callback(access_token))
}

function addSubscriber(callback) {
  subscribers.push(callback)
}

export default {
  init() {
    axios.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      // const { config, response: { status } } = error
      const {config, response} = error
      const originalRequest = config

      // if (status === 401) {
      if (response && response.status === 401) {
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true
          // store.dispatch("auth/fetchAccessToken")
          //   .then((access_token) => {
          //     })
          // if (isAlreadyFetchingAccessToken) {
          //
          //   let access_token = localStorage.getItem('token')
          //   onAccessTokenFetched(access_token)
          //   originalRequest.headers.Authorization = 'Bearer ' + access_token
          //   isAlreadyFetchingAccessToken = false
          //   // retryOriginalRequest();
          // }

        }

        const retryOriginalRequest = new Promise((resolve) => {
          addSubscriber(access_token => {
            console.log('access_token')
            console.log(access_token)
            originalRequest.headers.Authorization = 'Bearer ' + access_token
            resolve(axios(originalRequest))
          })
        })
        return retryOriginalRequest
      }
      return Promise.reject(error)
    })
  },
  login(path, data) {

    return axios.post(path, data)
  },
  refreshToken() {
    return axios.post(requests.REFRESH_ACCESS_TOKEN, {token: localStorage.getItem("token")})
  }
}
