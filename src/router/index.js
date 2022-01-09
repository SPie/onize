import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'

import Dashboard from '@/pages/dashboard/Dashboard'
import Login from '@/pages/login/Login'
import Profile from "@/pages/users/Profile"
import Register from '@/pages/users/Register'
import Projects from '@/pages/projects/Projects'
import CreateProject from '@/pages/projects/CreateProject'
import ShowProject from '@/pages/projects/ShowProject'

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
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {requiresAuth: true}
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
      meta: {requiresAuth: true},
    },
    {
      path: '/projects/create',
      name: 'CreateProject',
      component: CreateProject,
      meta: {requiresAuth: true},
    },
    {
      path: '/projects/:project/show',
      name: 'ShowProject',
      component: ShowProject,
      meta: {requiresAuth: true}
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