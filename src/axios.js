// axios
import axios from 'axios'

const baseURL = process.env.VUE_APP_API;

export default axios.create({
  baseURL: baseURL,
  withCredentials: false,
  // You can add your headers here
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})
