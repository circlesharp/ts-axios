import { transformRequest, transformResponse } from "./helpers/data";
import { processHeaders } from "./helpers/headers";
import { buildURL } from "./helpers/url";
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "./types";
import xhr from "./xhr";

function axios(config: AxiosRequestConfig): AxiosPromise {
  // 1 处理配置
  processConfig(config);

  // 2 发请求
  return xhr(config).then(res => transformResponseData(res));
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
  config.headers = transformHeaders(config);

  // data 要比 headers 晚处理
  config.data = transformRequestData(config);
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildURL(url, params);
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data);
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config;
  return processHeaders(headers, data);
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data);
  return res;
}

export default axios;