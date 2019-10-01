import Vue from 'vue';

export default {
  actions: {
    setUser: ({ commit }, newValue) => {
      commit('updateUser', newValue);
    },
    setUserImage: ({ commit }, newValue) => {
      commit('setUserImage', newValue);
    },
  },
  getters: {
    getUser: state => state.user,
  },
  mutations: {
    setUserImage(state, data) {
      Vue.set(state.user, 'image', data);
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
    user: {
      image: {
        data: '',
        filename: '',
      },
    },
  },
};
