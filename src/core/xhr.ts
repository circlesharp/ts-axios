/**
 * 文件导出 xhr
 * xhr 函数返回通过 Promise 包装的 响应结果 or 异常
 */

import { createError } from "../helpers/error";
import { parseHeaders } from "../helpers/headers";
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "../types";

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout, cancelToken } = config;
    const request = new XMLHttpRequest();

    /* 设置响应类型 */
    if (responseType) {
      request.responseType = responseType;
    }

    /* 设置超时 */
    if (timeout) {
      request.timeout = timeout;
    }

    /* 设置取消 */
    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort();
        reject(reason);
      });
    }

    /* xhrReq.open */
    request.open(method.toUpperCase(), url!, true);

    /* xhrReq.setRequestHeader */
    Object.keys(headers).forEach(name => {
      request.setRequestHeader(name, headers[name]);
    });

    /* xhrReq.send */
    request.send(data);

    /* 回调函数 readyState */
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

    /* 回调函数 网络异常错误 */
    request.onerror = function handleError() {
      reject(createError({
        message: 'Network Error',
        config,
        code: null,
        request,
      }));
    };

    /* 回调函数 超时 */
    request.ontimeout = function handleTimeout() {
      reject(createError({
        message: `Timeout of ${timeout} ms Exceeded`,
        config,
        code: 'ECONNABORTED',
        request,
      }));
    };

    /* 处理响应数据 */
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
