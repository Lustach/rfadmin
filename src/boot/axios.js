import Vue from 'vue'
import axios from 'axios'
import Router from '../router'
import { ROUTE_AUTH } from 'src/router/routes'

axios.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  if (error.response?.status === 401) {
    localStorage.removeItem('token')
    Router.push({ name: ROUTE_AUTH })
  }

  return Promise.reject(error)
})

Vue.use({
  install (Vue) {
    axios.defaults.baseURL = process.env.API_URL

    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common.Authorization = 'Bearer ' + token
    }

    axios.interceptors.request.use(config => {
      config.headers.Accept = 'application/json'

      return config
    })

    Vue.prototype.$api = Vue.api = axios
  }
})
