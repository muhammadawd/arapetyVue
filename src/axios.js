// axios
import axios from 'axios'

const baseURL = "https://jsonplaceholder.typicode.com"
// let token = '';
export default axios.create({
  baseURL: baseURL,
  withCredentials: false,
  // You can add your headers here
  // headers: {
  //   'Authorization': token ? `Bearer ${token}` : '',
  //   'Content-Type': 'application/json',
  //   'Accept': 'application/json'
  // }
})
