import Vuex, { createNamespacedHelpers } from 'vuex';
import { DefineActions, DefineGetters, DefineMutations } from 'vuex-type-helper';
import { API } from 'aws-amplify';
import Page from '@/types/Page';

export interface State {
  pages: Page[];
}

export interface Getters {
  pages: Page[];
}

export interface Mutations {
  getPages: {}
}

export interface Actions {
  getPagesAction: {}
}

export const state: State = {
  pages: []
};

export const getters: DefineGetters<Getters, State> = {
  pages: (state) => state.pages,
};

export const mutations: DefineMutations<Mutations, State> = {
  getPages(state) {
    let apiName = 'homepageCmsApi';
    let path = '/api/pages'; 
    let myInit = { // OPTIONAL
        headers: {}, // OPTIONAL
        response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
        queryStringParameters: {  // OPTIONAL
            name: 'param'
        }
    }
    API.get(apiName, path, myInit).then(response => {
        // Add your code here
        console.log("api success")
        console.log(response)
    }).catch(error => {
      console.log("api failure")
      console.log(error)
    });
  },
};

export const actions: DefineActions<Actions, State, Mutations, Getters> = {
  getPagesAction({ commit }) {
    commit('getPages', {});
  }
};

export const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
} = createNamespacedHelpers<State, Getters, Mutations, Actions>('pages');

export const pages = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};