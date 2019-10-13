import axios from 'axios';

export default {
  async checkLoginStatus() {
    return axios({
      method: 'GET',
      url: '/authorize',
      withCredentials: true,
    }).then(response => response);
  },
  async login(payload) {
    return axios({
      data: payload,
      method: 'post',
      url: '/login',
      withCredentials: true,
    }).then(response => response);
  },
  async logout() {
    return axios({
      method: 'POST',
      url: '/logout',
      withCredentials: true,
    }).then(response => response);
  },
};
