/* eslint-disable */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var pacakge = require('./package.json');
var ip = require('ip');
var argv = require('yargs')
    .default('p', pacakge.config.PORT || 8000)
    .default('a', pacakge.config.DB_PORT || 8001)
    .argv;
var jsonServer = require('json-server');

var PORT = argv.p;
var DB_PORT = argv.a;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
  historyApiFallback: {
      index: 'index.html'
  }
}).listen(PORT, '0.0.0.0', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log(`Server started at http://localhost:${PORT}/`);
  console.log(`Tunnel started at http://${ip.address()}:${PORT}/`);

  jsonServer.create()
      .use(jsonServer.defaults())
      .use(jsonServer.router('db.json'))
      .listen(DB_PORT, function(err) {
          if (err) {
              return console.log(err);
          }

          console.log(`Fake api server opened at port ${DB_PORT}`);
      })
});
