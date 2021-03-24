import { isPlainObject } from "./utils";

export function transformRequest<T>(data: T): T | string {
	// 只需要对 普通对象 进行转换
	if (isPlainObject(data)) {
		return JSON.stringify(data);
	}

	return data;
}