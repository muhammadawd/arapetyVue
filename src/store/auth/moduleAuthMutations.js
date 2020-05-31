import axios from "@/axios.js"

export default {
  SET_BEARER(state, token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  }
}
