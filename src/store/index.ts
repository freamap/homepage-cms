import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from '@/store/modules/auth'
import { pages } from '@/store/modules/pages'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    pages
  },
  state: {
  },
  mutations: {

  },
  actions: {

  }
})
