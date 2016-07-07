/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OfflinePlugin = require('offline-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: [
		'babel-polyfill',
		'whatwg-fetch',
		'html5-history-api',
		'./src/index',
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].chunk.js',
		publicPath: '/'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
			include: path.join(__dirname, 'src')
		}, {
			// Do not transform vendor's CSS with CSS-modules
			test: /\.css$/,
			loaders: ['style-loader', 'css-loader'],
			include: path.join(__dirname, 'node_modules')
		}, {
			test: /\.global\.css$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader'),
			include: path.join(__dirname, 'src')
		}, {
			test: /^((?!\.global).)*\.css$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'),
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
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),

		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			children: true,
			minChunks: 2,
			async: true,
		}),

		// OccurrenceOrderPlugin is needed for long-term caching to work properly.
		// See http://mxs.is/googmv
		new webpack.optimize.OccurrenceOrderPlugin(true),

		// Merge all duplicate modules
		new webpack.optimize.DedupePlugin(),

		// Minify and optimize the JavaScript
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false, // ...but do not show warnings in the console (there is a lot of them)
			},
		}),

		// Minify and optimize the index.html
		new HtmlWebpackPlugin({
			template: 'src/index.ejs',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
			favicon: 'src/favicon.ico',
			inject: true,
			showErrors: false,
			filename: 'index.html'
		}),

		// stylelint css files
		new StyleLintPlugin({
			files: 'src/**/*.css',
			failOnError: true,
		}),

		// Extract the CSS into a seperate file
		new ExtractTextPlugin('[name].[contenthash].css'),

		// Put it in the end to capture all the HtmlWebpackPlugin's
		// assets manipulations and do leak its manipulations to HtmlWebpackPlugin
		new OfflinePlugin({
			// No need to cache .htaccess. See http://mxs.is/googmp,
			// this is applied before any match in `caches` section
			excludes: ['.htaccess'],

			caches: {
				main: [':rest:'],

				// All chunks marked as `additional`, loaded after main section
				// and do not prevent SW to install. Change to `optional` if
				// do not want them to be preloaded at all (cached only when first loaded)
				additional: ['*.chunk.js'],
			},

			// Removes warning for about `additional` section usage
			safeToUseOptionalCaches: true,

			AppCache: {
				// Starting from offline-plugin:v3, AppCache by default caches only
				// `main` section. This lets it use `additional` section too
				caches: ['main', 'additional'],
			},
		}),
	],
};
