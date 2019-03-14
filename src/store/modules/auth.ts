import Vuex, { createNamespacedHelpers } from 'vuex';
import { DefineActions, DefineGetters, DefineMutations } from 'vuex-type-helper';
import { Auth } from 'aws-amplify';

export interface State {
  token: string;
}

export interface Getters {
  token: string;
}

export interface Mutations {
  signup: {
    userName: string;
    password: string;
    email: string;
  },
  confirmCode: {
    userName: string;
    code: string;
  },
  signin: {
    userName: string;
    password: string;
  }
}

export interface Actions {
  signupAction: {
    userName: string;
    password: string;
    email: string;
  },
  confirmCodeAction: {
    userName: string;
    code: string;
  },
  signinAction: {
    userName: string;
    password: string;
  }
}

export const state: State = {
  token: 'aaaa'
};

export const getters: DefineGetters<Getters, State> = {
  token: (state) => state.token,
};

export const mutations: DefineMutations<Mutations, State> = {
  signup(state, { userName, password, email}) {
    Auth.signUp(userName, password, email)
    .then((data) => { 
      console.log(data)
    })
    .catch((err) => {
      console.log(err);
      return;
    });
  },
  confirmCode(state, { userName, code}) {
    Auth.confirmSignUp(userName, code)
    .then((data) => { 
      console.log(data)
    })
    .catch((err) => {
      console.log(err);
      return;
    });
  },
  signin(state, { userName, password }) {
    Auth.signIn(userName, password)
    .then((result) => { 
      console.log(result)
      state.token = 'aaaa'
    })
    .catch((err) => {
      console.log(err);
      return;
    });
  },
};

export const actions: DefineActions<Actions, State, Mutations, Getters> = {
  signupAction({ commit }, payload) {
    commit('signup', payload);
  },
  confirmCodeAction({ commit }, payload) {
    commit('confirmCode', payload);
  },
  signinAction({ commit }, payload) {
    commit('signin', payload);
  }
};

export const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
} = createNamespacedHelpers<State, Getters, Mutations, Actions>('auth');

export const auth = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};