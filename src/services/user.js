import axios from 'axios';

export default {
  async get(id) {
    return axios({
      method: 'GET',
      url: `/user/${id}`,
      withCredentials: true,
    }).then(response => response);
  },
  async getThisUser() {
    return axios({
      method: 'GET',
      url: '/user/',
      withCredentials: true,
    }).then(response => response);
  },
  async update(payload, id) {
    return axios({
      data: payload,
      method: 'PUT',
      url: `/user/${id}`,
      withCredentials: true,
    }).then(response => response);
  },
};
