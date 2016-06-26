/* eslint-disable */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var pacakge = require('./package.json');
var ip = require('ip');
var argv = require('yargs')
    .default('p', pacakge.config.port || 8000)
    .argv;

var PORT = argv.p;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
  historyApiFallback: true
}).listen(PORT, '0.0.0.0', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log(`Server started at http://localhost:${PORT}/`);
  console.log(`Tunnel started at http://${ip.address()}:${PORT}/`);
});
