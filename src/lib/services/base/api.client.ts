import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
});

export default apiClient;
