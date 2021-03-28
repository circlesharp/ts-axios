import axios from '../../src/index';

axios.interceptors.request.use(config => {
	config.headers.test += '1';
	return config;
});
const reqInterceptor = axios.interceptors.request.use(config => {
	config.headers.test += '2';
	return config;
});
axios.interceptors.request.use(config => {
	config.headers.test += '3';
	return config;
});

axios.interceptors.response.use(res => {
	res.data += '1';
	return res;
});
const resInterceptor = axios.interceptors.response.use(res => {
	res.data += '2';
	return res;
});
axios.interceptors.response.use(res => {
	res.data += '3';
	return res;
});

axios.interceptors.request.eject(reqInterceptor);
axios.interceptors.response.eject(resInterceptor);

axios.get('/interceptor/get', {
	headers: { test: 'zzz' },
})
	// ps 响应拦截是不会影响响应的结果，但是变动会体现出来
	.then(res => console.log(res.data));