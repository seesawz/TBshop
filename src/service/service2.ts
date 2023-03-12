import HYRequest from './request'

import { TIME_OUT } from './request/config'

import { getToken,resetToken } from '@/utils/token'
const hyRequest2 = new HYRequest({

    baseURL: 'http://43.139.230.109:9002',

    timeout: TIME_OUT,

    interceptors: {
        requestInterceptor: (config) => {
            const token = getToken()
            if (token) {
                config.headers!['auth-token']= token 
            }
            return config

        },

        requestInterceptorCatch: (err) => {
            return err

        },

        responseInterceptor: (config) => {
            const {data} = config
            if(data.code === 1 && data.message === '用户未登录'){
                resetToken()
                alert("登录过期，请重新登录")
                window.location.href='/'
            }
            return config

        },

        responseInterceptorCatch: (err) => {
            console.log('响应失败拦截')
            return err
        }
    }

})


export default hyRequest2
