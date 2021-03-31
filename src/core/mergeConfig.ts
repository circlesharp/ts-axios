import { deepMerge, isPlainObject } from "../helpers/utils";
import { AxiosRequestConfig, AxiosResponse } from "../types";

const strats = Object.create(null);

// 优先取 val2
function defaultStart(val1: any, val2: any) {
	return typeof val2 !== 'undefined' ? val2 : val1;
}

// 只取 val2
function fromVal2Strat(val1: any, val2: any) {
	if (typeof val2 !== 'undefined') {
		return val2;
	}
}

// 深合并
function deepMergeStrat(val1: any, val2: any): any {
	if (isPlainObject(val2)) {
		return deepMerge(val1, val2);
	} else if (typeof val2 !== 'undefined') {
		// val2 有值不为对象
		return val2;
	} else if (isPlainObject(val1)) {
		return deepMerge(val1);
	} else if (typeof val1 !== 'undefined') {
		return val1;
	} else {
		//
	}
}

const stratKeysFromVal2 = ['url', 'params', 'data'];
stratKeysFromVal2.forEach(key => {
	strats[key] = fromVal2Strat;
});

const stratKeysDeepMerge = ['headers'];
stratKeysDeepMerge.forEach(key => {
	strats[key] = deepMergeStrat;
});

export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig): AxiosRequestConfig {
	if (!config2) {
		config2 = {};
	}

	const config = Object.create(null);

	for (const key in config2) {
		mergeField(key);
	}

	for (const key in config1) {
		if (!config2[key]) {
			mergeField(key);
		}
	}

	function mergeField(key: string): void {
		const strat = strats[key] || defaultStart;
		config[key] = strat(config1[key], config2![key]);
	}

	return config;
}

