import HYRequest from './request'

import { BASE_URL, TIME_OUT } from './request/config'

import { getToken } from '@/utils/token'
const hyRequest = new HYRequest({
  baseURL: BASE_URL,

  timeout: TIME_OUT,

  interceptors: {
    requestInterceptor: config => {
      const token = getToken()
      console.log('token',token)
      if (token) {
          if(config.headers){
config.headers['auth-token'] = token
          }
      }
      return config
    },

    requestInterceptorCatch: err => {
      return err
    },

    responseInterceptor: config => {
      return config
    },

    responseInterceptorCatch: err => {
      console.log('响应失败拦截')
      return err
    }
  }
})

export default hyRequest
