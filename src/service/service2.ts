import HYRequest from './request'

import { TIME_OUT } from './request/config'

import { getToken } from '@/utils/token'
const hyRequest2 = new HYRequest({
  baseURL: 'http://43.139.230.109:9002',

  timeout: TIME_OUT,

  interceptors: {
    requestInterceptor: config => {
      const token = getToken()
      if (token) {
        config.headers!['auth-token'] = token
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

export default hyRequest2
