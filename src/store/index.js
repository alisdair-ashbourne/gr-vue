import Vue from 'vue';
import Vuex from 'vuex';

import authentication from '@/store/modules/authentication.js';
import user from '@/store/modules/user.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
    user,
  },
});
