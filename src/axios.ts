/**
 * 文件导出 axios
 * axios 既是 Axios 的实例，也是 axios.request 方法
 * 兼容了 axios() && axios.request() && axios[method]()
 */

import Axios from "./core/Axios";
import mergeConfig from "./core/mergeConfig";
import defaults from "./default";
import { extend } from "./helpers/utils";
import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from "./types";

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config);

  const instance = Axios.prototype.request.bind(context); // 我觉得可以是 context.request

  extend(instance, context);

  return instance as AxiosStatic;
}

const axios = createInstance(defaults);

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config));
};

export default axios;
