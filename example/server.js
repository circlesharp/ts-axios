const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const WebpackConfig = require('./webpack.config');

const app = express();
const compiler = webpack(WebpackConfig);

app.use(webpackDevMiddleware(compiler, {
	publicPath: '/__build__/',
	stats: {
		colors: true,
		chunks: false
	}
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static(__dirname));

// for parsing application/json
app.use(express.json());
// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded());

const router = express.Router();

router.get('/simple/get', async (req, res) => {
	res.json({ msg: 'hello world' });
});

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

app.use(router);

const port = process.env.PORT || 8080;
module.exports = app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`);
});
