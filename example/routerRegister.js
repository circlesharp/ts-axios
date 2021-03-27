const express = require('express');

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
	router.get('/extend/get', (req, res) => {
		_routerHelper('get', req, res);
	});
	router.delete('/extend/delete', (req, res) => {
		_routerHelper('delete', req, res);
	});
	router.options('/extend/options', (req, res) => {
		_routerHelper('options', req, res);
	});
	router.head('/extend/head', (req, res) => {
		_routerHelper('head', req, res);
	});
	router.post('/extend/post', (req, res) => {
		_routerHelper('post', req, res);
	});
	router.put('/extend/put', (req, res) => {
		_routerHelper('put', req, res);
	});
	router.patch('/extend/patch', (req, res) => {
		_routerHelper('patch', req, res);
	});
};

const _routerHelper = (method, req, res) => {
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
};