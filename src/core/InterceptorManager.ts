/**
 * 文件导出 拦截器管理类
 * 类中包括拦截器数组
 * use 方法往数据追加函数
 * eject 方法让指定位置的函数变为 null
 * forEach 方法不对外暴露，用于遍历拦截器数组
 */

import { RejectedFn, ResolvedFn } from "../types";

interface Interceptor<T> {
	resolved: ResolvedFn<T>;
	rejected?: RejectedFn;
}

export default class InterceptorManager<T> {
	private interceptors: Array<Interceptor<T> | null>;

	constructor() {
		this.interceptors = [];
	}

	use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
		this.interceptors.push({ resolved, rejected });
		return this.interceptors.length - 1;
	}

	eject(id: number): void {
		if (this.interceptors[id]) {
			this.interceptors[id] = null;
		}
	}

	// 拦截器的遍历 没有在 type 中的 interface 中暴露，作为内部使用
	forEach(fn: (Interceptor: Interceptor<T>) => void): void {
		this.interceptors.forEach(interceptor => {
			if (interceptor !== null) {
				fn(interceptor);
			}
		});
	}
}
