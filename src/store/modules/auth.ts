import Vuex, { createNamespacedHelpers } from 'vuex';
import { DefineActions, DefineGetters, DefineMutations } from 'vuex-type-helper';

export interface State {
  token: string;
}

export interface Getters {
  token: string;
}

export interface Mutations {
  // increment: {};
}

export interface Actions {
  // incrementAction: {};
}

export const state: State = {
  token: ''
};

export const getters: DefineGetters<Getters, State> = {
  token: (state) => state.token,
};

export const mutations: DefineMutations<Mutations, State> = {
  // increment(state, {}) {
  //   state.counter += 1;
  // },
};

export const actions: DefineActions<Actions, State, Mutations, Getters> = {
  // incrementAction({ commit }, payload) {
  //   commit('increment', payload);
  // },
};

export const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
} = createNamespacedHelpers<State, Getters, Mutations, Actions>('app');

export const auth = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};