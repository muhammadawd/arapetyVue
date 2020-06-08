// axios
import axios from 'axios'

const baseURL = process.env.VUE_APP_API;
let token = localStorage.getItem("token");
export default axios.create({
  baseURL: baseURL,
  withCredentials: false,
  // You can add your headers here
  headers: {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})
