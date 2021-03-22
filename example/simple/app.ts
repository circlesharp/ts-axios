import axios from '../../src/index';
console.log(233, axios);


axios({
	method: 'get',
	url: '/simple/get',
	params: {
		a: 1,
		b: 2
	}
});
