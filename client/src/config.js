import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://micro-mailer-app.herokuapp.com/',
});
