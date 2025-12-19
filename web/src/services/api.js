import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/inventory-app/api/index.php'
});

export default api;