/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------

==========================================================================================*/


import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)


// axios
import axios from "./axios.js"

Vue.prototype.$http = axios

// helper
import helper from "./filters/helper.js"

Vue.prototype.$helper = helper

// API Calls
// import "./http/requests"

// Theme Configurations
import '../themeConfig.js'

// Globally Registered Components
import './globalComponents.js'

// sweet alert 2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

// register globally multiselect
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';

Vue.component('multiselect', Multiselect)

// lodash
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

Vue.use(VueLodash, {name: 'custom', lodash: lodash});

// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css'


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'

// socket io with vuex
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"

let user_id = null;
let userInfo = JSON.parse(localStorage.getItem('userInfo'));
if (userInfo) user_id = userInfo.id;
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO(process.env.VUE_APP_SOCKET_IO, {
    transports: ['websocket'],
    query: {
      user_id: `admin-${user_id}`
    }
  }),
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
}));


// i18n
import i18n from './i18n/i18n'


// Vuexy Admin Filters
import './filters/filters'


// Clipboard
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard);


// Tour
// import VueTour from 'vue-tour'
// Vue.use(VueTour)
// require('vue-tour/dist/vue-tour.css')


// VeeValidate
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);


// Google Maps
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    // Add your API key here
    key: process.env.VUE_APP_GOOGLE_MAP,
    libraries: 'places', // This is required if you use the Auto complete plug-in
  },
})

// Vuejs - Vue wrapper for hammerjs
import {VueHammer} from 'vue2-hammer'

Vue.use(VueHammer)


// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'


// Feather font icon
require('./assets/css/iconfont.css')


// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  // acl,
  render: h => h(App)
}).$mount('#app')
