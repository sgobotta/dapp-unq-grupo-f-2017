// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueMaterial from 'vue-material'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueSession from 'vue-session'

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(VueResource)
// Vue.config.productionTip = false
Vue.use(VueSession)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAXmFo85dSNJOtKdc0eMqssCYIUpvLjLVY',
    libraries: 'places' // This is required if you use the Autocomplete plugin
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
