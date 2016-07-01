/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var ExportFilesWebpackPlugin = require('export-files-webpack-plugin');
var glob = require('glob');
var StyleLintPlugin = require('stylelint-webpack-plugin');

var entries = glob.sync('./src/entries/*.js')
	.reduce(function(obj, cur) {
		obj[path.basename(cur, '.js')] = [
			'babel-polyfill',
			'whatwg-fetch',
			cur,
		];
		return obj;
	}, {
		dev: [
			'webpack-dev-server/client?http://0.0.0.0:8000',
			'webpack/hot/only-dev-server',
			'react-hot-loader/patch',
			'./src/views',
		],
	});

module.exports = {
	devtool: 'eval',
	entry: entries,
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js',
		publicPath: '/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
		new ExportFilesWebpackPlugin('[name].html'),
		new StyleLintPlugin({
			files: 'src/**/*.css',
		}),
	],
	module: {
		loaders: [
            {
    			test: /\.js$/,
    			loader: 'babel',
    			include: path.join(__dirname, 'src')
		    },
			{
				// Do not transform vendor's CSS with CSS-modules
				test: /\.css$/,
				loaders: ['style-loader', 'css-loader'],
				include: path.join(__dirname, 'node_modules')
			},
            {
                test: /\.global\.css$/,
                loader: 'style-loader!css-loader!postcss-loader',
                include: path.join(__dirname, 'src')
            },
            {
    			test: /^((?!\.global).)*\.css$/,
                loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
                include: path.join(__dirname, 'src')
		    },
			{
		    	test: /\.(jpg|png|gif)$/,
		    	loaders: [
					'file-loader?name=./assets/[name]__[hash].[ext]',
		    		'image-webpack?{progressive:true, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
		    	],
				include: path.join(__dirname, 'src')
		    },
			{
				test: /\.(ico)$/,
		    	loader: 'file-loader?name=./[name].[ext]',
				include: path.join(__dirname, 'src')
			},
			{
				test: /\.ejs$/,
				loader: 'file?name=[name].html!ejs-html',
				include: path.join(__dirname, 'src')
			},
        ]
	},
    postcss: function (webpack) {
        return [
            require("postcss-import")({ addDependencyTo: webpack }),
            require("postcss-url")(),
            require("postcss-cssnext")(),
            require("postcss-browser-reporter")(),
            require("postcss-reporter")(),
        ]
    }
};
