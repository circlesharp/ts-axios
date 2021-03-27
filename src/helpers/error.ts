import { AxiosRequestConfig, AxiosResponse, InterfaceAxiosError } from "../types";

interface AxiosErrorInitParams {
	message: string,
	config: AxiosRequestConfig,
	code?: string | null,
	request?: any,
	response?: AxiosResponse,
}

export class AxiosError extends Error implements InterfaceAxiosError {
	isAxiosError: boolean;
	config: AxiosRequestConfig;
	code?: string | null;
	request?: any;
	response?: AxiosResponse;

	constructor(
		{
			message,
			config,
			code,
			request,
			response
		}: AxiosErrorInitParams
	) {
		super(message);

		this.isAxiosError = true;
		this.config = config;
		this.code = code;
		this.request = request;
		this.response = response;

		// 修复 TypesScript 的自带的坑
		Object.setPrototypeOf(this, AxiosError.prototype);
	}
}

export function createError(axiosErrorInitParams: AxiosErrorInitParams) {
	return new AxiosError(axiosErrorInitParams);
}
