import client from './client'

const END_POINT = '/users'

const register = (email, password) => client.post(END_POINT, {email: email, password: password})

export {register}