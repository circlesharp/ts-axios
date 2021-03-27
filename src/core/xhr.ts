import { createError } from "../helpers/error";
import { parseHeaders } from "../helpers/headers";
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "../types";

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config;
    const request = new XMLHttpRequest();

    /**
     * 设置响应类型
     */
    if (responseType) {
      request.responseType = responseType;
    }

    /**
     * 设置超时
     */
    if (timeout) {
      request.timeout = timeout;
    }

    /**
     * xhrReq.open(method, url, [async, user, password]);
     * async 表示是否异步执行操作 默认为true
     * user password 可选的用户名用于认证用途；默认为null
     */
    request.open(method.toUpperCase(), url!, true);

    // resolve
    request.onreadystatechange = function handleLoad() {
      /**
       * * readyState
       *  0 － （未初始化）还没有调用send()方法
       *  1 － （载入）已调用send()方法，正在发送请求
       *  2 － （载入完成）send()方法执行完成，已经接收到全部响应内容
       *  3 － （交互）正在解析响应内容
       *  4 － （完成）响应内容解析完成，可以在客户端调用了
       */
      if (request.readyState !== 4) {
        return;
      }

      /**
       * 判断状态码 status
       */
      if (request.status === 0) {
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

      handleResponse(response);
    };

    // reject 1 网络异常错误
    request.onerror = function handleError() {
      reject(createError({
        message: 'Network Error',
        config,
        code: null,
        request,
      }));
    };

    // reject 2 超时
    request.ontimeout = function handleTimeout() {
      reject(createError({
        message: `Timeout of ${timeout} ms Exceeded`,
        config,
        code: 'ECONNABORTED',
        request,
      }));
    };

    // reject 3 status 不在 [200, 300] 区间
    // handleResponse() 来解决

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


    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        reject(new Error(`Request Failed with Status Code ${response.status}`));
        reject(createError({
          message: `Request Failed with Status Code ${response.status}`,
          config,
          code: null,
          request,
          response,
        }));
      }
    }
  });
};
