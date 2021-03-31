import Axios from "./core/Axios";
import defaults from "./default";
import { extend } from "./helpers/utils";
import { AxiosInstance, AxiosRequestConfig } from "./types";

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config);
  const instance = Axios.prototype.request.bind(context); // 我觉得可以是 context.request

  extend(instance, context);

  return instance as AxiosInstance;
}

const axios = createInstance(defaults);

export default axios;
