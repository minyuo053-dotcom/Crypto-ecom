import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://your-api-url.com/api', // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set up token authentication
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Adjust this to however you're storing the token
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getProducts = () => apiClient.get('/products');
export const getUsers = () => apiClient.get('/users');
export const getOrders = () => apiClient.get('/orders');

export default apiClient;