import Vue from 'vue'
import Router from 'vue-router'
import { Auth } from 'aws-amplify';
import Home from './views/Home.vue'
import Signin from './views/Signin.vue'
import SigninMfa from './views/SigninMfa.vue'
import Signup from './views/Signup.vue'
import Signout from './views/Signout.vue'
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
      path: '/signin-mfa',
      name: 'signin-mfa',
      component: SigninMfa,
      meta: {
        auth: true
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
      path: '/signout',
      name: 'signout',
      component: Signout,
      meta: {
        auth: true
      }
    },
    {
      path: '/confirmCode',
      name: 'confirmCode',
      component: ConfirmCode,
      meta: {
        auth: true
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

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    try {
      let user = await Auth.currentAuthenticatedUser()
      await auth.mutations.setUser(auth.state, user)
      if (to.path === '/confirmCode' || to.path === '/signin-mfa') {
        return next('/dashboard')
      }
      return next()
    } catch(err) {
      if (err === 'not authenticated') {
        if (to.path !== '/confirmCode' && to.path !== '/signin-mfa') {
          return next('/signin?redirect=' + to.path)
        } else {
          if (auth.state.tempUser || auth.state.user) {
            return next()
          }
          return next('/signin')
        }
      }
      return next('/')
    }
  }
  return next()
})

export default router