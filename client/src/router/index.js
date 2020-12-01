import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Users from '@/components/Users'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    }
  ]
})
