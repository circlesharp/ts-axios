const toString = Object.prototype.toString;

// 使用了类型保护（类型谓词）
export function isDate(val: any): val is Date {
	return toString.call(val) === '[object Date]';
}

export function isObject(val: any): val is Object {
	return val !== null && typeof val === 'object';
}

export function isPlainObject(val: any): val is Object {
	return toString.call(val) === '[object Object]';
}

export function extend<T, U>(to: T, from: U): T & U {
	// 注意 不能简单地用 { ...to, ...from }, to 可以不是对象
	for (const key in from) {
		(to as T & U)[key] = from[key] as any;
	}
	return to as T & U;
}
