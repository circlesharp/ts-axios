export type Method =
  'get' | 'post' | 'delete' | 'put' | 'patch' | 'options' | 'head';


export interface AxiosRequestConfig {
  url: string;
  method?: Method;
  data?: any;
  params?: any;
  headers?: any;
}
