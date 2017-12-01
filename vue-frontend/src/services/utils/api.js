import Vue from 'vue'

const apiUrl = 'http://localhost:3000'

export default {
  get (url, request) {
    return Vue.http.get(apiUrl + url, request)
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error))
  },
  post (url, request) {
    return Vue.http.post(apiUrl + url, request)
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error))
  },
  put (url, request) {
    return Vue.http.put(apiUrl + url, request)
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error))
  },
  delete (url, request) {
    return Vue.http.delete(apiUrl + url, request)
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error))
  }
}
