import { flattenHeaders } from "../helpers/headers";
import { buildURL } from "../helpers/url";
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "../types";
import transform from "./transform";
import xhr from "./xhr";

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
	// 1 处理配置
	processConfig(config);

	// 2 发请求
	return xhr(config).then(res => transformResponseData(res));
}

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
