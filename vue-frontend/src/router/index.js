import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Callback from '@/components/Callback'
import MenuHome from '@/components/MenuHome'
import Orders from '@/components/Orders'

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
    }
  ]
})

export default router
