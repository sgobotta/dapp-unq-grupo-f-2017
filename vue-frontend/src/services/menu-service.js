import api from './utils/api.js'

export const createMenu = (menu) => {
  return api.post('/menu/', menu)
}

export const getMenus = () => {
  return api.get('/menu/')
}

export const deleteMenu = (id) => {
  return api.delete('/provider/' + id)
}
