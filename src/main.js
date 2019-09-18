import axios from 'axios';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueRouter from 'vue-router';

import App from '@/App.vue';
import router from '@/util/Route.vue';
import '@/util/VueMaterial.vue';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

Vue.use(Vuelidate);
Vue.use(VueRouter);

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  validations: {},
});
