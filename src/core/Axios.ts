import dispatchRequest from "../core/dispatchRequest";
import { AxiosPromise, AxiosRequestConfig, Method } from "../types";

export default class Axios {
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

		return dispatchRequest(config!);
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
