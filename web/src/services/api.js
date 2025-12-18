import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/inventory-app/api/',
});

export default api;