import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue'
import { I18n } from 'aws-amplify';

I18n.setLanguage('ja')

const awsmobile = require('./aws-exports').default;
Amplify.configure({
  ...awsmobile,
  Auth: {
    storage: window.localStorage
  }
});

Vue.use(AmplifyPlugin, AmplifyModules)

Vue.config.productionTip = false
Vue.use(Buefy)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
