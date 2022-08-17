import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://micro-app-mailer.herokuapp.com',
});
