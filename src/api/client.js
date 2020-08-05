import axios from 'axios'

const client = axios.create({
  baseURL: 'http://onize.x/api', // TODO
  withCredentials: true
})

export default client