import type {  AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios'





export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?: HYRequestInterceptors<T>
}
export interface HYRequestInterceptors<T = AxiosResponse> {
    requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
    requestInterceptorCatch?: (error: any) => any
    responseInterceptor?: (res: T) => T
    responseInterceptorCatch?: (error: any) => any

}
