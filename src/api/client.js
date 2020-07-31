import axios from 'axios'

const client = axios.create({
  baseURL: 'http://onize-api.x/api' // TODO
})

export default client