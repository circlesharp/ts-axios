const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const WebpackConfig = require('./webpack.config');
const {
	registerSimpleRouter,
	registerBaseRouter,
	registerErrorRouter,
	registerExtendRouter,
} = require('./routerRegister');

const app = express();
const compiler = webpack(WebpackConfig);
const router = express.Router();

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

// 路由
registerSimpleRouter(router);
registerBaseRouter(router);
registerErrorRouter(router);
registerExtendRouter(router);


app.use(router);

const port = process.env.PORT || 8080;
module.exports = app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`);
});
