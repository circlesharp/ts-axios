const registerSimpleRouter = router => {
	router.get('/simple/get', async (req, res) => {
		res.json({ msg: 'hello world' });
	});
};

const registerBaseRouter = router => {
	router.get('/base/get', async (req, res) => {
		res.json(req.query);
	});

	router.post('/base/post', async (req, res) => {
		res.json(req.body);
	});

	router.post('/base/buffer', async (req, res) => {
		const msg = [];
		req.on('data', chunk => {
			if (chunk) {
				msg.push(chunk);
			}
		});
		req.on('end', () => {
			res.json(Buffer.concat(msg).toJSON());
		});
	});
};

const registerErrorRouter = router => {
	router.get('/error/get', (req, res) => {
		if (Math.random() > 0.5) {
			res.json({
				msg: 'hello world'
			});
		} else {
			res.status(500);
			res.end();
		}
	});

	router.get('/error/timeout', (req, res) => {
		setTimeout(() => {
			res.json({
				msg: 'hello world'
			});
		}, 3000);
	});
};

const registerExtendRouter = router => {
	router.get('/extend/get', _routerHelper);
	router.delete('/extend/delete', _routerHelper);
	router.options('/extend/options', _routerHelper);
	router.head('/extend/head', _routerHelper);
	router.post('/extend/post', _routerHelper);
	router.put('/extend/put', _routerHelper);
	router.patch('/extend/patch', _routerHelper);

	router.get('/extend/user', (req, res) => {
		res.json({
			code: 0,
			message: 'ok',
			result: {
				name: 'tom',
				age: 18,
			}
		});
	});
};

const registerInterceptorRouter = router => {
	router.get('/interceptor/get', (req, res) => {
		res.end('xxx');
	});
};

const registerConfigRouter = router => {
	router.post('/config/post', (req, res) => {
		res.json(req.body);
	});
};

const _routerHelper = (req, res) => {
	res.json({
		method: req.method,
		data: Object.keys(req.body).length > 0 ? req.body : 'no body(data)',
	});
};


module.exports = {
	registerSimpleRouter,
	registerBaseRouter,
	registerErrorRouter,
	registerExtendRouter,
	registerInterceptorRouter,
	registerConfigRouter,
};
