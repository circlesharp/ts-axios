/**
 * 文件导出 default config
 * 但是这个 config 的 headers 是不符合规范的
 * 包含了 common, ...methods 等字段（会在后序的 transform 中转为标准的）
 */

import { transformRequest, transformResponse } from './helpers/data';
import { processHeaders } from './helpers/headers';
import { AxiosRequestConfig } from './types';

const defaults: AxiosRequestConfig = {
	method: 'get',
	timeout: 0,
	headers: {
		// headers 包括 common, get, post, ... 等 http 方法
		common: {
			Accept: 'application/json, text/plain, */*',
		},
	},

	transformRequest: [
		function (data: any, headers: any): any {
			processHeaders(headers, data);
			return transformRequest(data);
		}
	],

	transformResponse: [
		function (data: any): any {
			return transformResponse(data);
		}
	],
};

const methodNoData = ['get', 'delete', 'head', 'options'];
methodNoData.forEach(method => {
	defaults.headers[method] = {};
});

const methodWithData = ['post', 'put', 'patch'];
methodWithData.forEach(method => {
	defaults.headers[method] = {
		'Content-Type': 'application/x-www-form-urlencoded',
	};
});

export default defaults;
