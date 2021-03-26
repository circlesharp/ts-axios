import { parseHeaders } from "./helpers/headers";
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "./types";

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { data = null, url, method = 'get', headers, responseType } = config;
    const request = new XMLHttpRequest();

    /**
     * 设置响应类型
     */
    if (responseType) {
      request.responseType = responseType;
    }

    /**
     * xhrReq.open(method, url, [async, user, password]);
     * async 表示是否异步执行操作 默认为true
     * user password 可选的用户名用于认证用途；默认为null
     */
    request.open(method.toUpperCase(), url, true);


    request.onreadystatechange = function handleLoad() {
      /**
       * readyState
       *  0 － （未初始化）还没有调用send()方法
       *  1 － （载入）已调用send()方法，正在发送请求
       *  2 － （载入完成）send()方法执行完成，已经接收到全部响应内容
       *  3 － （交互）正在解析响应内容
       *  4 － （完成）响应内容解析完成，可以在客户端调用了 
      */
      if (request.readyState !== 4) {
        return;
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders());
      const responseData = responseType === 'text'
        ? request.responseText
        : request.response;
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request,
      };

      resolve(response);
    };

    /**
     * 处理 headers
     * 时机: 在 open 之后
     */
    Object.keys(headers).forEach(name => {
      request.setRequestHeader(name, headers[name]);
    });

    /**
     * XMLHttpRequest.send(body)
     * body 默认值为 null
     * 可以为 Document, 可以为 XMLHttpRequestBodyInit
     * 如果请求方法是 GET 或者 HEAD，则应将请求主体设置为 null
     */
    request.send(data);
  });
}
