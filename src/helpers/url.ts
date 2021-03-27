import { isDate, isPlainObject } from "./utils";

// encode uri
// 特殊字符支持 @ : $ , + [ ]
function encode(val: string) {
	return encodeURIComponent(val)
		.replace(/%40/ig, '@')
		.replace(/%3a/ig, ':')
		.replace(/%24/ig, '$')
		.replace(/%2c/ig, ',')
		.replace(/%20/ig, '+')
		.replace(/%5b/ig, '[')
		.replace(/%5d/ig, ']');
}

/**
 * url 处理函数
 * 1. 参数值为数组
 * 2. 参数值为对象
 * 3. 参数值为 Date 类型
 * 4. 特殊字符支持
 * 5. 空值忽略
 * 6. 丢弃 url 中的哈希标记
 * 7. 保留 url 中已存在的参数
 * 
 * @param url 
 * @param params 
 * @returns 处理好的 url
 */
export function buildURL(url: string, params?: any): string {
	// 没有 params, 直接返回 url
	if (!params) {
		return url;
	}

	// 键值对数组 用作储存 uri
	const parts: string[] = [];

	Object.keys(params).forEach(key => {
		const val = params[key];

		// 空值处理
		if (val == null) {
			return;
		}

		// 数组处理 ['bar', 'baz'] => foo[]=bar, foo[]=baz
		// 都统一成数组，在进行拼接
		let values = [];
		if (Array.isArray(val)) {
			values = val;
			key += '[]';
		} else {
			values = [val];
		}
		values.forEach(val => {
			if (isDate(val)) {
				// 日期处理
				val = val.toISOString();
			}
			else if (isPlainObject(val)) {
				// 对象处理
				val = JSON.stringify(val);
			}

			parts.push(`${encode(key)}=${encode(val)}`);
		});
	});

	let serializedParams = parts.join('&');
	if (serializedParams) {
		// 丢弃哈希标记 /base/get#hash => /base/get
		const markIndex = url.indexOf('#');
		if (markIndex !== -1) {
			url = url.slice(0, markIndex);
		}

		// 保留 url 中已存在的参数
		url = `${url}${url.indexOf('?') === -1 ? '?' : '&'}${serializedParams}`;
	}

	return url;
}
