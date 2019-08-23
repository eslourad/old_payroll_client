import Vue from 'vue'
import VeeValidate from 'vee-validate';
import App from './App.vue'
import router from './router'
import Auth from './packages/auth/Auth.js'
import axios from 'axios'
import jQuery from 'jquery'
global.$ = jQuery
// eslint-disable-next-line
let Bootstrap = require('bootstrap')
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(Auth)
Vue.use(VeeValidate, {
  classes: true,
  classNames: {
    invalid: "is-invalid"
  }
});
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://server.solarace.com.ph/'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.auth.getToken()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
