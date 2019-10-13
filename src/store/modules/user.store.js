import Vue from 'vue';

import AuthenticationApi from '@/services/authentication.service.js';

export default {
  actions: {
    async checkLoginStatus({ commit }) {
      AuthenticationApi.checkLoginStatus()
        .then(response => {
          commit('updateIsLoggedIn', true);
          commit('updateUser', response.data);
        })
        .catch(() => {
          commit('updateIsLoggedIn', false);
          commit('updateUser', null);
        });
    },
    setUser: ({ commit }, newValue) => {
      commit('updateUser', newValue);
    },
    setUserImage: ({ commit }, newValue) => {
      commit('setUserImage', newValue);
    },
  },
  getters: {
    getIsLoggedIn: state => state.isLoggedIn,
    getUser: state => state.user,
  },
  mutations: {
    setUserImage(state, data) {
      Vue.set(state.user, 'image', data);
    },
    updateIsLoggedIn(state, isLoggedIn) {
      Vue.set(state, 'isLoggedIn', isLoggedIn);
    },
    updateUser(state, data) {
      const user = {
        image: {
          data: '',
          filename: '',
        },
        ...data,
      };

      Vue.set(state, 'user', user);
    },
  },
  namespaced: true,
  state: {
    isLoggedIn: false,
    user: {
      image: {
        data: '',
        filename: '',
      },
    },
  },
};
