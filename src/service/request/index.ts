import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './type'
import { resetToken } from '@/utils/token'
import { message } from 'antd'

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  config: any
  constructor(config: HYRequestConfig) {
    this.config = config
    //创建axios实例
    this.instance = axios.create(config)
    //保存基本信息
    this.interceptors = config.interceptors
    //使用拦截器
    //从config钟取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptorCatch,
      this.interceptors?.requestInterceptor
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    //所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      config => {
        console.log('所有的实例都有的拦截器: 请求拦截成功')
        return config
      },

      err => {
        console.log('所有的实例都有的拦截器: 请求拦截失败')

        return err
      }
    )

    this.instance.interceptors.response.use(
      res => {
        console.log('所有的实例都有的拦截器: 响应拦截成功')
        const { data } = res
        console.log(data)
        if (data.code === 1 && data.message === '用户未登录') {
          resetToken()
          message.info('登录过期，请重新登录')
          window.location.href = '/login'
          return
        }
        if (data.code === 1 && data.message === '请求资源auth-token为空') {
          resetToken()
          message.info('登录过期，请重新登录')
          window.location.href = '/login'
          return
        }
        return res.data
      },

      err => {
        console.log('所有的实例都有的拦截器: 响应拦截失败')

        //例子:判断不同httpErrorCode显示不同错误信息

        if (err.response.status === 404) {
          console.log('404错误~')
        }

        return err
      }
    )
  }

  request<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //单个请求对请求config的处理

      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      this.instance

        .request<any, T>(config)

        .then(res => {
          //单个请求对数据的处理

          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          console.log(res)

          //将结果返回出去

          resolve(res)
        })

        .catch(err => {
          reject(err)

          return err
        })
    })
  }
  public setConfig(url: string) {
    this.config.baseURL = url
    this.instance = axios.create(this.config)
  }
  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
  put<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }
}

export default HYRequest
