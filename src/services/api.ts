import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localizaunifap.herokuapp.com',
});

export default api;
