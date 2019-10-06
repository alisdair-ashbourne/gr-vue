import axios from 'axios';

export default {
  async create(payload) {
    return axios({
      data: payload,
      method: 'POST',
      url: `/user`,
      withCredentials: true,
    }).then(response => response);
  },
  async deleteThisUser() {
    return axios({
      method: 'DELETE',
      url: '/user/',
      withCredentials: true,
    }).then(response => response);
  },
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
