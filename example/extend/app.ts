import axios from '../../src/index';

// 调用 axios -> context.request -> dispatchRequest
axios({
	url: '/extend/post',
	method: 'post',
	data: { msg: 'old fashion' },
});

// 调用 request axios 本身就是 含有request 的交叉类型
axios.request({
	url: '/extend/post',
	method: 'post',
	data: { msg: 'request' },
});

// 调用不支持 data 的
axios.get('/extend/get');
axios.delete('/extend/delete');
axios.options('/extend/options');
axios.head('/extend/head');

// // 调用支持 data 的
axios.post('/extend/post', { data: { msg: 'post' } });
axios.put('/extend/put', { data: { msg: 'put' } });
axios.patch('/extend/patch', { data: { msg: 'patch' } });
