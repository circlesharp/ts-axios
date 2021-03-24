import { isPlainObject } from "./utils";

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
