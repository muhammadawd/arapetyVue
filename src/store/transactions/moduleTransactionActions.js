import axios from "@/axios.js"
import requests from "@/requests.js"

export default {
  fetchTransactions({commit}, filters) {
    return new Promise((resolve, reject) => {
      axios.get(requests.ALL_TRANSACTIONS, {
        params: filters
      })
        .then((response) => {
          if (response.data.status) {
            commit('SET_TRANSACTIONS', response.data.data.transactions.data)
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
