/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: {
		app: './src/index',
		vendor: ['page', 'react', 'react-dom']
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].[chunkhash].js',
		chunkFilename: "[name].[chunkhash].chunk.js",
		publicPath: ''
	},
	module: {
		loaders: [
            {
    			test: /\.js$/,
    			loader: 'babel',
    			include: path.join(__dirname, 'src')
		    },
            {
                test: /\.global\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader'),
                include: path.join(__dirname, 'src')
            },
            {
    			test: /^((?!\.global).)*\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'),
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
				test: /\.ejs$/,
				loader: 'ejs-compiled',
				include: path.join(__dirname, 'src/views')
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
    },
	plugins: [
		new webpack.DefinePlugin({
	      'process.env':{
	        'NODE_ENV': JSON.stringify('production')
	      }
	    }),

		new webpack.optimize.CommonsChunkPlugin('vendor', '[name].[chunkhash].js'),

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

		// Minify HTML entry
		new HtmlWebpackPlugin({
			template: './src/index.ejs',
			filename: 'index.html',
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
		}),

		// Extract the CSS into a seperate file
	    new ExtractTextPlugin('[name].[contenthash].css'),
	],
};
