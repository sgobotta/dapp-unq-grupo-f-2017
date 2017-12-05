import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Callback from '@/components/Callback'
import MenuHome from '@/components/MenuHome'
import Orders from '@/components/Orders'
import ProviderMenus from '@/components/ProviderMenus'
import Profile from '@/components/Profile'

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
      path: '/menus',
      name: 'MenuHome',
      component: MenuHome
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders
    },
    {
      path: '/provider-menus',
      name: 'ProviderMenus',
      component: ProviderMenus
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})

export default router
