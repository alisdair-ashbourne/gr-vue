import Vue from 'vue';
import VueRouter from 'vue-router';

import App from '@/App.vue';
import router from '@/util/Route.vue';
import '@/util/VueMaterial.vue';

Vue.use(VueRouter);

new Vue({
  el: '#app',
  render: h => h(App),
  router,
});
