var path = require('path');
var webpack = require('webpack');
var glob = require('glob');

var entries = glob.sync('./src/entries/*.js')
	.reduce((e, cur) => (
		Object.assign(
			e,
			{ [path.basename(cur, '.js')]: cur }
		)
	), {});

module.exports = {
	devtool: 'source-map',
	entry: Object.assign({}, entries, {
		views: './src/entry'
	}),
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js',
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
                loader: 'style-loader!css-loader?sourceMap!postcss-loader',
                include: path.join(__dirname, 'src')
            },
            {
    			test: /^((?!\.global).)*\.css$/,
                loader: 'style-loader!css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
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
    },
	plugins: [
		new webpack.DefinePlugin({
	      'process.env':{
	        'NODE_ENV': JSON.stringify('production')
	      }
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
	],
};
