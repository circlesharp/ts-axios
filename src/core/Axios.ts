/**
 * 文件导出 Axios 类
 * request 是 Axios 的核心实例方法
 * request 派生诸多请求方法
 * request 本质上实现了对被 promist 包装的 config / response 的调用（拦截）
 */

import dispatchRequest from "../core/dispatchRequest";
import { AxiosPromise, AxiosRequestConfig, AxiosResponse, Method, RejectedFn, ResolvedFn } from "../types";
import InterceptorManager from "./InterceptorManager";
import mergeConfig from "./mergeConfig";

interface Interceptors {
	request: InterceptorManager<AxiosRequestConfig>;
	response: InterceptorManager<AxiosResponse>;
}

interface PromiseChain<T> {
	resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise); // 后半段是指 dispatchRequest
	rejected?: RejectedFn;
}

export default class Axios {
	defaults: AxiosRequestConfig;
	interceptors: Interceptors;

	constructor(initConfig: AxiosRequestConfig) {
		this.defaults = initConfig;
		this.interceptors = {
			request: new InterceptorManager<AxiosRequestConfig>(),
			response: new InterceptorManager<AxiosResponse>(),
		};
	}


	// ================= 核心方法 request =================

	request(url: any, config?: AxiosRequestConfig): AxiosPromise {
		// ================= 处理 config  =================

		/* 规范化 后续操作统一处理 config */
		/* 重载 request，但是对外暴露的接口定义不体现这一点，只在实现中兼容 */
		if (typeof url === 'string') {
			if (!config) {
				config = {};
			}
			config.url = url;
		} else {
			config = url;
		}

		/* config 深合并 */
		config = mergeConfig(this.defaults, config);


		// ================= 处理返回（经过一系列拦截的请求结果） =================

		/* 拦截链 链的中心的发请求 左边是请求拦截 右边是响应拦截 */
		const chain: Array<PromiseChain<any>> = [{
			resolved: dispatchRequest,
			rejected: undefined,
		}];

		/* 请求拦截 LIFO */
		this.interceptors.request.forEach(interceptor => {
			chain.unshift(interceptor);
		});

		/* 响应拦截 FIFO */
		this.interceptors.response.forEach(interceptor => {
			chain.push(interceptor);
		});

		/* promise 包装 config  并链式调用拦截 */
		/* config 在 dispatchRequest 后变成了 response */
		let promise = Promise.resolve(config!);
		while (chain.length) {
			const { resolved, rejected } = chain.shift()!;
			promise = promise.then(resolved, rejected);
		}

		return promise as AxiosPromise;
	}


	// ================= 派生于 request 的 7 个方法 & 它们的辅助函数 =================

	/* 不含 data 的请求 (get, delete, head, options) */
	get(url: string, config?: AxiosRequestConfig): AxiosPromise {
		return this._requestMethodWithoutData('get', url, config);
	}
	delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
		return this._requestMethodWithoutData('delete', url, config);
	}
	head(url: string, config?: AxiosRequestConfig): AxiosPromise {
		return this._requestMethodWithoutData('head', url, config);
	}
	options(url: string, config?: AxiosRequestConfig): AxiosPromise {
		return this._requestMethodWithoutData('options', url, config);
	}

	/* 含 data 的请求 (post, put, patch) */
	post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
		return this._requestMethodWithData('post', url, data, config);
	}

	put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
		return this._requestMethodWithData('put', url, data, config);
	}

	patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
		return this._requestMethodWithData('patch', url, data, config);
	}

	// 适用于 get, delete, head, options
	_requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig): AxiosPromise {
		return this.request({
			...config,
			method,
			url,
		});
	}

	// 适用于 post, put, patch
	_requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
		return this.request({
			...config,
			...data,
			method,
			url,
		});
	}
}
