import api from './utils/api.js'

export const getOrders = (cuit) => {
  return api.get('/order/', cuit)
}

export const generateOrder = (order) => {
  return api.post('/order/')
}
