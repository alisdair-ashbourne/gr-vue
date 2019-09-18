import axios from 'axios';

export default {
  login(payload) {
    return axios.post('/login', payload).then(response => {
      return response;
    });
  },
};
