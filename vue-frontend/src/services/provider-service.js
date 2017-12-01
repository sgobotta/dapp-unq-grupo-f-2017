import api from './utils/api.js'

export const registerProvider = (provider) => {
  return api.post('/provider/', provider)
}

export const getProvider = (email) => {
  return api.get('/provider/' + email)
}

export const deleteProvider = (email) => {
  return api.delete('/provider/' + email)
}

export const updateProvider = (email) => {
  return api.put('/provider/')
}
