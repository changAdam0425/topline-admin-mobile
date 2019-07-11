import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'Home',
      path: '/',
      component: () => import('@/views/home')
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/login')
    },
    {
      name: 'test',
      path: '/test',
      component: () => import('@/views/test')
    }
  ]
})
