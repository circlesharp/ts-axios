import dispatchRequest from "../core/dispatchRequest";
import { AxiosPromise, AxiosRequestConfig, AxiosResponse, Method, RejectedFn, ResolvedFn } from "../types";
import InterceptorManager from "./InterceptorManager";

interface Interceptors {
	request: InterceptorManager<AxiosRequestConfig>;
	response: InterceptorManager<AxiosResponse>;
}

interface PromiseChain<T> {
	resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise); // 后半段是指 dispatchRequest
	rejected?: RejectedFn;
}

export default class Axios {
	interceptors: Interceptors;

	constructor() {
		this.interceptors = {
			request: new InterceptorManager<AxiosRequestConfig>(),
			response: new InterceptorManager<AxiosResponse>(),
		};
	}

	/* 重载 request，但是对外暴露的接口定义不体现这一点，只在实现中兼容 */
	request(url: any, config?: AxiosRequestConfig): AxiosPromise {
		if (typeof url === 'string') {
			if (!config) {
				config = {};
			}
			config.url = url;
		} else {
			config = url;
		}

		const chain: Array<PromiseChain<any>> = [{
			resolved: dispatchRequest,
			rejected: undefined,
		}];

		this.interceptors.request.forEach(interceptor => {
			// 后添加先执行，且在 dispatchRequest 之前
			chain.unshift(interceptor);
		});

		this.interceptors.response.forEach(interceptor => {
			// 先添加先执行，且在 dispatchRequest 之后
			chain.push(interceptor);
		});

		let promise = Promise.resolve(config!);
		while (chain.length) {
			// 实现了 promise 的链式调用
			const { resolved, rejected } = chain.shift()!;
			promise = promise.then(resolved, rejected);
		}

		return promise as AxiosPromise;
	}

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
