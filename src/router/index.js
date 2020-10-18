import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'

import Dashboard from '@/pages/dashboard/Dashboard'
import Login from '@/pages/login/Login'
import Register from '@/pages/users/Register'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {requiresAuth: true}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})

router.beforeEach(function(to, from, next) {
  if (to.meta.requiresAuth && !store.getters.authenticatedUser) {
    next({name: 'Login'})
  }
  if (to.name === 'Login' && store.getters.authenticatedUser) {
    next({name: 'Dashboard'})
  }
  
  next()
})

export default router