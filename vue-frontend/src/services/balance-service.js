import api from './utils/api.js'

export const getProviderBalance = (email) => {
  return api.get('/balance/provider/' + email)
}

export const updateProviderBalance = (email, amount) => {
  return api.put('/balance/provider/' + email + amount)
}

export const getCustomerBalance = (cuit) => {
  return api.get('/balance/customer/' + cuit)
}

export const updateCustomerBalance = (cuit, amount) => {
  return api.put('/balance/customer/' + cuit + amount)
}
