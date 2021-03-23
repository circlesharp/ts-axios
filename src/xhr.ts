import { AxiosRequestConfig } from "./types";

export default function xhr(config: AxiosRequestConfig) {
	const { data = null, url, method = 'get' } = config;
	const request = new XMLHttpRequest();

  /**
   * xhrReq.open(method, url, [async, user, password]);
   * async 表示是否异步执行操作 默认为true
   * user password 可选的用户名用于认证用途；默认为null
   */
	request.open(method.toUpperCase(), url, true);

  /**
   * XMLHttpRequest.send(body)
   * body 默认值为 null
   * 可以为 Document, 可以为 XMLHttpRequestBodyInit
   * 如果请求方法是 GET 或者 HEAD，则应将请求主体设置为 null
   */
	request.send(data);
}
