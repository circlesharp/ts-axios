import { Method } from "../types";
import { deepMerge, isPlainObject } from "./utils";

const CONTENT_TYPE = 'Content-Type';

export function processHeaders(headers: any, data: any): any {
	if (isPlainObject(data)) {
		// 仅当传入 data 且 data 是普通对象的时候，才处理 headers
		normalizeHeaderName(headers, CONTENT_TYPE);
		if (headers && !headers[CONTENT_TYPE]) {
			headers[CONTENT_TYPE] = 'application/json;chartset=utf-8';
		}
	}

	return headers;
}

function normalizeHeaderName(headers: any, normalizedName: string): void {
	if (!headers) {
		return;
	}

	Object.keys(headers).forEach(name => {
		if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
			headers[normalizedName] = headers[name];
			delete headers[name];
		}
	});
}

export function parseHeaders(headers: string): any {
	// `
	// connection: keep-alive
	// content-length: 13
	// content-type: application/json; charset=utf-8
	// date: Fri, 26 Mar 2021 16:59:47 GMT
	// etag: W/"d-dSDgb4OWh/o1B/toCU79AZ1wFEQ"
	// keep-alive: timeout=5
	// x-powered-by: Express
	// ` => { ... }

	const parsed: { [key: string]: string; } = {}; // 或者 const parsed = Object.create(null);
	if (!headers) {
		return parsed;
	}

	const lines = headers.split('\r\n');
	for (const line of lines) {
		let [key, val] = line.split(':');
		key = key.trim().toLowerCase();
		if (!key) {
			continue;
		}
		if (val) {
			val = val.trim();
		}
		parsed[key] = val;
	}

	return parsed;
}

export function flattenHeaders(headers: any, method: Method): any {
	if (!headers) {
		return headers;
	}

	headers = deepMerge(headers.common, headers[method], headers);

	const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common'];

	methodsToDelete.forEach(met => {
		delete headers[met];
	});

	return headers;
}
