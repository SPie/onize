import client from './client'

const ENDPOINT = '/users'
const ENDPOINT_UPDATE_PASSWORD = '/users/password'

const register = (email, password) => client.post(ENDPOINT, {email: email, password: password})

const update = (email) => client.patch(ENDPOINT, {email: email})

const updatePassword  = (password) => client.patch(ENDPOINT_UPDATE_PASSWORD, {password: password})

export {
    register,
    update,
    updatePassword
}