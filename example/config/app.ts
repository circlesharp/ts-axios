import axios, { AxiosTransformer } from '../../src/index';
import qs from 'qs';

axios.defaults.headers.common['test2'] = 123;

axios({
	url: '/config/post',
	method: 'post',
	data: qs.stringify({ a: 1 }),
	headers: {
		test: '321',
	},
})
	.then(res => {
		console.log(res.data);
	});

axios({
	transformRequest: [
		data => data,
		// data => qs.stringify(data),
		...axios.defaults.transformRequest as Array<AxiosTransformer>,
	],
	transformResponse: [
		...axios.defaults.transformResponse as Array<AxiosTransformer>,
		data => {
			if (typeof data === 'object') {
				data.b = 2;
			}
			return data;
		},
	],
	url: '/config/post',
	method: 'post',
	data: { a: 1 },
})
	.then(res => {
		console.log(res.data);
	});

const instance = axios.create({
	transformRequest: [
		data => qs.stringify(data),
		...axios.defaults.transformRequest as AxiosTransformer[],
	],
	transformResponse: [
		...axios.defaults.transformResponse as AxiosTransformer[],
		data => {
			if (typeof data === 'object') {
				data.b = 234;
			}
			return data;
		}
	],
});

instance.post('/config/post', {
	data: { a: 123 }
})
	.then(res => console.log(res.data));
