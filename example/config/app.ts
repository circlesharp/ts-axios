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
