import Vuex, { createNamespacedHelpers } from 'vuex';
import { DefineActions, DefineGetters, DefineMutations } from 'vuex-type-helper';
import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import router from '../../router'

export interface State {
  user: CognitoUser | null;
  tempUser: {userName: string, password: string} | null;
  error: {[key: string]: string } | null;
  execute: string | null;
}

export interface Getters {
  user: CognitoUser | null;
  error: {[key: string]: string } | null;
  execute: string | null;
}

export interface Mutations {
  signup: {
    userName: string;
    password: string;
    email: string;
    phoneNumber: string;
  },
  confirmCode: {
    code: string;
    commit: any;
  },
  signin: {
    userName: string;
    password: string;
  },
  signout: {},
  signinMfa: {
    code: string
  },
  setUser: {
    user: CognitoUser
  }
}

export interface Actions {
  signupAction: {
    userName: string;
    password: string;
    email: string;
    phoneNumber: string;
  },
  confirmCodeAction: {
    userName: string;
    code: string;
  },
  signinAction: {
    userName: string;
    password: string;
  },
  signoutAction: {},
  signinMfaAction: {
    code: string
  },
}

export const state: State = {
  user: null,
  tempUser: null,
  error: null,
  execute: null
};

export const getters: DefineGetters<Getters, State> = {
  user: (state) => state.user,
  error: (state) => state.error,
  execute: (state) => state.execute,
};

export const mutations: DefineMutations<Mutations, State> = {
  signup(state, { userName, password, email, phoneNumber }) {
    state.execute = 'signup'
    state.error = null

    Auth.signUp(userName, password, email, '+81' + phoneNumber)
    .then((data) => {
      state.tempUser = {
        userName: userName,
        password: password
      }
      state.execute = null
      router.push('/confirmCode')
    })
    .catch((err) => {
      state.execute = 'error'
    })
  },
  confirmCode(state, { code, commit }) {
    state.execute = 'confirmCode'
    state.error = null

    let userName = state.tempUser? state.tempUser.userName: ''
    let password = state.tempUser? state.tempUser.password: ''

    Auth.confirmSignUp(userName, code)
    .then((data) => {
      commit("signin", {userName: userName, password: password})
    })
    .catch((err) => {
      state.error = {}

      if (err.code) {
        switch (err.code) {
          case "CodeMismatchException":
          state.error['code'] = "認証コードが違います。"
          break
        }
      } else {
        state.error['page'] = "エラーが発生しました。しばらく時間がたってからお試しください。"
      }

      state.execute = 'error'
    })
  },
  signin(state, { userName, password }) {
    state.execute = 'signin'
    state.error = null

    Auth.signIn(userName, password)
    .then((result) => {
      console.log(result)
      state.user = result
      state.tempUser = null
      state.execute = null
      router.push('/signin-mfa')
    })
    .catch((err) => {
      state.error = {}
      if (err.code) {
        switch (err.code) {
          case "UserNotConfirmedException":
            state.error = null
            state.execute = null
            state.tempUser = {
              userName: userName,
              password: password
            }
            router.push('/confirmCode')
            return
          case "UserNotFoundException":
          case "NotAuthorizedException":
            if (err.message === "Password attempts exceeded"){
              state.error['page'] = "ログインの試行回数を超えました。アカウントがロックされる可能性があります。"
            } else {
              state.error['page'] = "ユーザー名またはパスワードが違います。"
            }
            break
          case "NetworkError":
          state.error['page'] = "ネットワークに接続できませんでした。"
            break
        }
      } else {
        state.error['page'] = "エラーが発生しました。しばらく時間がたってからお試しください。"
      }
      state.execute = 'error'
    })
  },
  signout(state, {}) {
    state.execute = 'signout'
    state.error = null

    Auth.signOut()
    .then((result) => {
      state.user = null
      state.execute = null
    })
    .catch((err) => {
      state.user = null
      state.execute = 'error'
    })
  },
  signinMfa(state, { code }) {
    state.execute = 'signinMfa'
    state.error = null
    Auth.confirmSignIn(state.user, code, "SMS_MFA").then((result) => {
      state.user = result
      state.execute = null
    }).catch(err => {
      state.execute = 'error'
    })
  },
  setUser(state, { user }) {
    state.user = user;
  }
};

export const actions: DefineActions<Actions, State, Mutations, Getters> = {
  signupAction({ commit }, payload) {
    commit('signup', payload);
  },
  confirmCodeAction({ commit }, payload) {
    commit('confirmCode', { ...payload, commit: commit });
  },
  signinAction({ commit }, payload) {
    commit('signin', payload);
  },
  signoutAction({ commit }) {
    commit('signout', {});
  },
  signinMfaAction({ commit }, payload) {
    commit('signinMfa', payload);
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