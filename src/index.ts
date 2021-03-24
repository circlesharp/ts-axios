import { buildURL } from "./helpers/url";
import { AxiosRequestConfig } from "./types";
import xhr from "./xhr";

function axios(config: AxiosRequestConfig): void {
  // 1 处理配置
  processConfig(config);

  // 2 发请求
  xhr(config);
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildURL(url, params);
}

export default axios;