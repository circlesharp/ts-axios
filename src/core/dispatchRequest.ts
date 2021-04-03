/**
 * 文件导出 dispatchRequest
 * 这一步骤在 请求拦截和响应拦截之间
 * 除了处理 xhr, 处理了 config 中的 transform 配置
 */

import { flattenHeaders } from "../helpers/headers";
import { buildURL } from "../helpers/url";
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "../types";
import transform from "./transform";
import xhr from "./xhr";

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
	// 1 处理配置
	processConfig(config);

	// 2 发请求 & 处理响应数据
	return xhr(config).then(res => transformResponseData(res));
}

// =========== 发请求获取响应过程中的 transform ===========
// =========== 推导: interceptors 在 transform 之外 ===========
function processConfig(config: AxiosRequestConfig): void {
	config.url = transformURL(config);
	config.data = transform(config.data, config.headers, config.transformRequest);
	config.headers = flattenHeaders(config.headers, config.method!);
}

function transformURL(config: AxiosRequestConfig): string {
	const { url, params } = config;
	return buildURL(url!, params); // url! 断言 url 不为空
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
	res.data = transform(res.data, res.headers, res.config.transformResponse);
	return res;
}

export default dispatchRequest;
