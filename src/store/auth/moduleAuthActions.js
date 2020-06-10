import jwt from "../../http/requests/auth/jwt/index.js"
import axios from "@/axios.js"
import router from '@/router'
import requests from "@/requests.js"

export default {
  // JWT
  loginJWT({commit}, payload) {

    return new Promise((resolve, reject) => {
      jwt.login(requests.AUTH_JWT_LOGIN_ADMIN, {
        username: payload.userDetails.username,
        password: payload.userDetails.password
      })
        .then(response => {

          response = response.data;

          // If there's user data in response
          if (response.data.admin) {

            // Set accessToken
            localStorage.setItem("token", response.data.token);

            // Update user details
            commit('UPDATE_USER_INFO', response.data.admin, {root: true});

            // Set bearer token in axios
            commit("SET_BEARER", response.data.token);

            // Navigate User to homepage
            router.push(router.currentRoute.query.to || '/');


            resolve(response)
          } else {
            reject({message: payload.vm.$t('server_parse_error')})
          }

        })
        .catch(error => {
          reject(error)
        })
    })
  },
  setBearer({commit}, token) {
    // Set bearer token in axios
    commit("SET_BEARER", token);

  },
  fetchAccessToken() {
    return new Promise((resolve) => {
      jwt.refreshToken().then(response => {
        resolve(response)
      })
    })
  }
  // registerUserJWT({ commit }, payload) {
  //
  //   const { displayName, email, password, confirmPassword } = payload.userDetails
  //
  //   return new Promise((resolve,reject) => {
  //
  //     // Check confirm password
  //     if(password !== confirmPassword) {
  //       reject({message: "Password doesn't match. Please try again."})
  //     }
  //
  //     jwt.registerUser(displayName, email, password)
  //       .then(response => {
  //         // Redirect User
  //         router.push(router.currentRoute.query.to || '/')
  //
  //         // Update data in localStorage
  //         localStorage.setItem("accessToken", response.data.accessToken)
  //         commit('UPDATE_USER_INFO', response.data.userData, {root: true})
  //
  //         resolve(response)
  //       })
  //       .catch(error => { reject(error) })
  //   })
  // },
  // fetchAccessToken() {
  //   return new Promise((resolve) => {
  //     jwt.refreshToken().then(response => { resolve(response) })
  //   })
  // }
}
