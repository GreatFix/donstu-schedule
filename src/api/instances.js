import axios from 'axios'

export const DonstuAPI = axios.create({
  crossDomain: true,
  timeout: 15000,
  baseURL: 'https://edu.donstu.ru/api',
})
