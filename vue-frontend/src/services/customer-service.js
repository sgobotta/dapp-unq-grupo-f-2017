import api from './utils/api.js'

export const registerCustomer = (customer) => {
  return api.post('/customer/', customer)
}

export const getCustomer = (cuit) => {
  return api.get('/customer/' + cuit)
}

export const deleteCustomer = (cuit) => {
  return api.delete('/customer/' + cuit)
}

export const updateCustomer = (cuit) => {
  return api.put('/customer/' + cuit)
}
