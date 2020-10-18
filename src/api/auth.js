import client from './client'

const ENDPOINT_ME = '/me'
const ENDPOINT_AUTH = '/auth'

const login = (email, password) => client.post(ENDPOINT_AUTH, {email: email, password: password})
const authenticated = () => client.get(ENDPOINT_ME)

export {
    login,
    authenticated
}
