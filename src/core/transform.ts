/**
 * 文件导出 transform
 * 链式调用配置上的 transform 字段的方法
 */

import { AxiosTransformer } from "../types";

export default function transform(data: any, headers: any, fns?: AxiosTransformer | Array<AxiosTransformer>): any {
	if (!fns) {
		return data;
	}

	if (!Array.isArray(fns)) {
		fns = [fns];
	}

	fns.forEach(fn => {
		// 链式调用
		data = fn(data, headers);
	});

	return data;
}
