import api from './utils/api.js'

export const loginService = (request) => {
  return api.post('/authorization/' + request.email, { password: request.password })
}

export const logoutService = (email) => {
  return api.get('/authorization/' + email)
}
