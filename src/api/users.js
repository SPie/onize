import client from './client'

const ENDPOINT = '/users'

const register = (email, password) => client.post(ENDPOINT, {email: email, password: password})

export {
    register
}