import {AxiotRequestConfig,} from 'axios'

declare module 'axios' {
  interface AxiosRequestConfig {
    headers?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders;
  }
}
