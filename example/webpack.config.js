const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'development',

	/**
	 * 我们会在 examples 目录下建多个子目录
	 * 我们会把不同章节的 demo 放到不同的子目录中
	 * 每个子目录的下会创建一个 app.ts
	 * app.ts 作为 webpack 构建的入口文件
	 * entries 收集了多目录个入口文件，并且每个入口还引入了一个用于热更新的文件
	 * entries 是一个对象，key 为目录名
   *
   * entries: {
   *  simple: ['webpack-hot-middleware/client', '/...../simple/app.ts'],
   *  xxxxxx: ['webpack-hot-middleware/client', '/...../xxxxxx/app.ts'],
   * }
	 */
	entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
		const fullDir = path.join(__dirname, dir);
		const entry = path.join(fullDir, 'app.ts');
    // 判断路径是否存在 && 判断该路径下 app.ts 是否存在
		if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
			entries[dir] = ['webpack-hot-middleware/client', entry];
		}

		return entries;
	}, {}),

	/**
	 * 根据不同的目录名称，打包生成目标 js，名称和目录名一致
	 */
	output: {
		path: path.join(__dirname, '__build__'),
		filename: '[name].js',
		publicPath: '/__build__/'
	},

  /**
   * 使用 ts-loader 解析 .ts .tsx 文件
   * 所以每一个 app.ts 直接引入的 ts-axios 能执行
   */
	module: {
		rules: [
			{
				test: /\.ts$/,
				enforce: 'pre',
				use: [
					{
						loader: 'tslint-loader'
					}
				]
			},
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true
						}
					}
				]
			},
		],
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
};
