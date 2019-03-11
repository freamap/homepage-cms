import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signin from './views/Signin.vue'
import Signup from './views/Signup.vue'
import ConfirmCode from './views/ConfirmCode.vue'
import DashBoard from './views/DashBoard.vue'
import Error from './views/Error.vue'

import * as auth from '@/store/modules/auth.ts'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        auth: false
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
      meta: {
        auth: false
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: {
        auth: false
      }
    },
    {
      path: '/confirmCode',
      name: 'confirmCode',
      component: ConfirmCode,
      meta: {
        auth: false
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoard,
      meta: {
        auth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: Error,
      meta: {
        auth: false
      }
    },
    {
      path: '*',
      redirect: '/error'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(page => !page.meta.auth) || auth.state.token) {
    next()
  } else {
    next('/signin')
  }
})

export default router