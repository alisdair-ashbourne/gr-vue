import Vue from 'vue';

import LoginApi from '@/services/login.js';

export default {
  actions: {
    async checkLoginStatus({ commit }) {
      LoginApi.checkLoginStatus()
        .then(() => {
          commit('updateIsLoggedIn', true);
        })
        .catch(() => {
          commit('updateIsLoggedIn', false);
        });
    },
  },
  getters: {
    getIsLoggedIn: state => state.isLoggedIn,
  },
  mutations: {
    updateIsLoggedIn(state, isLoggedIn) {
      Vue.set(state, 'isLoggedIn', isLoggedIn);
    },
  },
  namespaced: true,
  state: {
    isLoggedIn: false,
  },
};
