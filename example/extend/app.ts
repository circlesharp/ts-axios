import axios from '../../src/index';

// 调用 axios -> context.request -> dispatchRequest
axios({
	url: '/extend/post',
	method: 'post',
	data: { msg: 'old fashion 1' },
});
axios('/extend/post', {
	method: 'post',
	data: { msg: 'old fashion 2' },
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


(function () {
	/**
	 * 响应数据支持泛型（比较绕）
	 * 
	 * 1. 2个接口，作用是规定了 res.data 的结构
	 * 2. 调用 axios 的 request 方法，传入的泛型约束 res.data
	 * 3. 在 axios 内部，AxiosResponse 的 data 的类型就是这个传入的泛型
	 * 4. 如果返回的 res.data 不为空，能得到类型推导
	 */

	interface ResponseData<T = any> {
		code: number;
		result: T;
		message: string;
	}

	interface User {
		name: string;
		age: number;
	}

	function getUser<T>() {
		return axios<ResponseData<T>>('/extend/user')
			.then(res => {
				console.log(res);

				return res.data;
			})
			.catch(console.error);
	}

	async function test() {
		const user = await getUser<User>();
		if (user) {
			user.result.name;
		}
	}

	test();
})();

