import Vuex, { createNamespacedHelpers } from 'vuex';
import { DefineActions, DefineGetters, DefineMutations } from 'vuex-type-helper';
import * as AWS from 'aws-sdk';

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
  }
}

export const state: State = {
  token: ''
};

export const getters: DefineGetters<Getters, State> = {
  token: (state) => state.token,
};

export const mutations: DefineMutations<Mutations, State> = {
  signup(state, { userName, password, email}) {
    AWS.config.region = 'ap-northeast-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'ap-northeast-1:a612ab67-5e9e-4f3f-8e81-c839c8723c55'
    });
    let cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

    var params = {
      ClientId: '2rrjt67aaolh99po230d6uecqf', /* required */
      Password: password, /* required */
      Username: userName, /* required */
      UserAttributes: [
        {
          Name: 'email',
          Value: email
        }
      ]
    };
    cognitoidentityserviceprovider.signUp(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
  },
  confirmCode(state, { userName, code}) {
    AWS.config.region = 'ap-northeast-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'ap-northeast-1:a612ab67-5e9e-4f3f-8e81-c839c8723c55'
    });
    let cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

    var params = {
      ClientId: '2rrjt67aaolh99po230d6uecqf', /* required */
      Username: userName, /* required */
      ConfirmationCode: code
    };
    cognitoidentityserviceprovider.confirmSignUp(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
  }
};

export const actions: DefineActions<Actions, State, Mutations, Getters> = {
  signupAction({ commit }, payload) {
    commit('signup', payload);
  },
  confirmCodeAction({ commit }, payload) {
    commit('confirmCode', payload);
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