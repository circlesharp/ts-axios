import axios, { InterfaceAxiosError } from '../../src/index';

// 故意写错 url
// axios({
// 	method: 'get',
// 	url: '/error/get1',
// })
// 	.then(res => {
// 		console.log(0, '故意写错 url: ', res);
// 	})
// 	.catch(err => {
// 		console.log(1, '故意写错 url: ', err);
// 	});

// 一定几率服务器报错
// axios({
// 	method: 'get',
// 	url: '/error/get',
// })
// 	.then(res => {
// 		console.log(0, '一定几率服务器报错: ', res);
// 	})
// 	.catch(err => {
// 		console.log(1, '一定几率服务器报错: ', err);
// 	});

// 模拟网络错误 - 在5秒以内断网触发
// setTimeout(() => {
// 	axios({
// 		method: 'get',
// 		url: '/error/get',
// 	})
// 		.then(res => {
// 			console.log(0, '模拟网络错误: ', res);
// 		})
// 		.catch(err => {
// 			console.log(1, '模拟网络错误: ', err);
// 		});
// }, 5000);

// 设置超时
axios({
	method: 'get',
	url: '/error/timeout',
	timeout: 2000,
})
	.then(res => {
		console.log(0, '设置超时: ', res);
	})
	.catch((err: InterfaceAxiosError) => {
		console.log('message: ', err.message);
		console.log('config: ', err.config);
		console.log('code: ', err.code);
		console.log('request: ', err.request);
	});
