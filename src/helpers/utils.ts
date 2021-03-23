const toString = Object.prototype.toString;

// 使用了类型保护（类型谓词）
export function isDate(val: any): val is Date {
	return toString.call(val) === '[object Date]';
}

export function isObject(val: any): val is Object {
	return toString.call(val) === '[object Object]';
}