import axios from 'axios';

export default {
  async checkLoginStatus() {
    return axios.get('/authorize').then(response => {
      return response;
    });
  },
  async login(payload) {
    return axios.post('/login', payload).then(response => {
      return response;
    });
  },
  async logout() {
    return axios.post('/logout').then(response => {
      return response;
    });
  },
};
