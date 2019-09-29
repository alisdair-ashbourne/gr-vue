import axios from 'axios';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueRouter from 'vue-router';

import App from '@/App.vue';
import router from '@/routes/index.js';
import store from '@/store/index.js';
import '@/utils/material.js';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

Vue.use(Vuelidate);
Vue.use(VueRouter);

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  validations: {},
});
