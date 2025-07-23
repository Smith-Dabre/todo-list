import axios from 'axios';

const API = axios.create({
  baseURL: 'http://10.10.96.30:3000/api', // Replace with your IP
});

export default API;