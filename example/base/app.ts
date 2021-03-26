import axios from '../../src/index';
import { AxiosRequestConfig } from '../../src/types';

interface optionsItem {
	url?: string;
	method?: string;
	params?: object;
	data?: any;
	headers?: any;
}

const method = 'get';
const url = '/base/get';

const optionsInstances: optionsItem[] = [
	// 处理数组
	{
		params: { foo: ['bar', 'baz'] },
	},

	// 处理对象 json 化
	{
		params: { foo: { bar: 'baz' } },
	},

	// 处理时间
	{
		params: { date: new Date() },
	},

	// 处理部分特殊字符
	{
		params: { foo: '@:$, ' },
	},

	// 处理空值
	{
		params: {
			foo: 'bar',
			baz: null,
		},
	},

	// 处理哈希
	{
		url: '/base/get#hash',
		params: {
			foo: 'bar'
		}
	},

	// 保留 url 中已存在的参数
	{
		url: '/base/get?foo=bar',
		params: {
			bar: 'baz'
		}
	},

	{
		method: 'post',
		url: '/base/post',
		data: { a: 1, b: 2 }
	},

	{
		method: 'post',
		url: '/base/post',
		data: { a: 1, b: 2 },
		headers: {
			'content-type': 'application/json',
			'Accept': 'application/json, text/plain, */*',
		}
	},

	// URLSearchParams 是 XMLHttpRequest.send(body) 的 body 中的一种
	{
		method: 'post',
		url: '/base/post',
		data: new URLSearchParams('q=URLUtils.searchParams&topic=api'),
	},

	{
		method: 'post',
		url: '/base/buffer',
		data: new Int32Array([21, 31])
	},
];

for (const options of optionsInstances) {
	if (options.url == null) {
		options.url = url;
	}
	if (options.method == null) {
		options.method = method;
	}

	axios(options as AxiosRequestConfig);
}


// ================= 处理响应数据 =================

// 没有配置 responseType 所以返回了字符串(尝试使用 JSON.parse)
axios({
	method: 'post',
	url: '/base/post',
	data: { a: 3, b: 4 }
}).then(console.log);

// 没有配置 responseType 为 json 所以返回了对象
axios({
	method: 'post',
	url: '/base/post',
	responseType: 'json',
	data: { a: 5, b: 6 }
}).then(console.log);
