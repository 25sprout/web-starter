/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExportFilesWebpackPlugin = require('export-files-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
	devtool: 'eval',
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:8000',
		'webpack/hot/only-dev-server',
		'react-hot-loader/patch',
		'babel-polyfill',
		'whatwg-fetch',
		'html5-history-api',
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.ejs',
			filename: 'index.html',
			inject: true,
			favicon: 'src/favicon.ico',
		}),
		new StyleLintPlugin({
			files: 'src/**/*.css',
		}),
	],
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel'],
			include: path.join(__dirname, 'src')
		}, {
			// Do not transform vendor's CSS with CSS-modules
			test: /\.css$/,
			loaders: ['style-loader', 'css-loader'],
			include: path.join(__dirname, 'node_modules')
		}, {
			test: /\.global\.css$/,
			loader: 'style-loader!css-loader!postcss-loader',
			include: path.join(__dirname, 'src')
		}, {
			test: /^((?!\.global).)*\.css$/,
			loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
			include: path.join(__dirname, 'src')
		}, {
			test: /\.(jpg|png|gif)$/,
			loaders: [
				'file-loader?name=./assets/[name]__[hash].[ext]',
				'image-webpack?{progressive:true, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
			],
			include: path.join(__dirname, 'src')
		}, {
			test: /\.ejs$/,
			loader: 'ejs-compiled',
			include: path.join(__dirname, 'src/views')
		}, ]
	},
	postcss: function(webpack) {
		return [
			require("postcss-import")({
				addDependencyTo: webpack
			}),
			require("postcss-url")(),
			require("postcss-cssnext")(),
			require("postcss-browser-reporter")(),
			require("postcss-reporter")(),
		]
	}
};
