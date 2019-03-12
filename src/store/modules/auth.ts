import Vuex, { createNamespacedHelpers } from 'vuex';
import { DefineActions, DefineGetters, DefineMutations } from 'vuex-type-helper';
import * as AWS from 'aws-sdk';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'

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
    var poolData = {
      UserPoolId : 'ap-northeast-1_GfDU0LXWU', // your user pool id here
      ClientId : '2rrjt67aaolh99po230d6uecqf' // your app client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    let attributeList = [];
    attributeList.push(
      new AmazonCognitoIdentity.CognitoUserAttribute(
        {
          Name: 'email',
          Value: email
        }
      )
    );
    userPool.signUp(userName, password, attributeList, [], function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    })
  },
  confirmCode(state, { userName, code}) {
    AWS.config.region = 'ap-northeast-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'ap-northeast-1:a612ab67-5e9e-4f3f-8e81-c839c8723c55'
    });
    var poolData = {
      UserPoolId : 'ap-northeast-1_GfDU0LXWU', // your user pool id here
      ClientId : '2rrjt67aaolh99po230d6uecqf' // your app client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var userData = {
      Username : userName,
      Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    // アクティベーション処理
    cognitoUser.confirmRegistration(code, true, function(err, result){
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(result);           // successful response
    });
  },
  signin(state, { userName, password }) {
    AWS.config.region = 'ap-northeast-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'ap-northeast-1:a612ab67-5e9e-4f3f-8e81-c839c8723c55'
    });

    // 認証データの作成
    var authenticationData = {
      Username: userName,
      Password: password
  };
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
  
  var poolData = {
    UserPoolId : 'ap-northeast-1_GfDU0LXWU', // your user pool id here
    ClientId : '4nr4g4tmpv79r5p7diqp4j37ng' // your app client id here
  };
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  var userData = {
      Username: userName,
      Pool: userPool
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  
  // 認証処理
  cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
          var idToken = result.getIdToken().getJwtToken();          // IDトークン
          var accessToken = result.getAccessToken().getJwtToken();  // アクセストークン
          var refreshToken = result.getRefreshToken().getToken();   // 更新トークン
          
          console.log("idToken : " + idToken);
          console.log("accessToken : " + accessToken);
          console.log("refreshToken : " + refreshToken);
          
          // サインイン成功の場合、次の画面へ遷移
      },

      onFailure: function(err) {
          // サインイン失敗の場合、エラーメッセージを画面に表示
          console.log(err);
      }
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