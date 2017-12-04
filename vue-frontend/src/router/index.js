import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Callback from '@/components/Callback'
import CustomerProfile from '@/components/CustomerProfile'
import ProviderProfile from '@/components/ProviderProfile'

Vue.use(Router)

// application routes
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/customerprofile',
      name: 'CustomerProfile',
      component: CustomerProfile
    },
    {
      path: '/providerprofile',
      name: 'ProviderProfile',
      component: ProviderProfile
    }
  ]
})

export default router
