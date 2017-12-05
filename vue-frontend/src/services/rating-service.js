import api from './utils/api.js'

export const rateProvider = (email, status) => {
  return api.put('/rating/', { email: email, rate: status })
}

export const getRating = (email) => {
  return api.get('/rating/' + email)
}
