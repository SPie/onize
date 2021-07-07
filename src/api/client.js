import axios from 'axios'

import router from '@/router'
import store from '@/store'

const client = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  withCredentials: true,

})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.commit('setAuthenticatedUser', null)

      return router.push({name: 'Login'})
    }

    return Promise.reject(error)
  }
)

export default client