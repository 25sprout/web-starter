/* eslint-disable */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var packageConfig = require('./package.json').config;
var ip = require('ip');
var argv = require('yargs')
    .default('p', packageConfig.PORT || 8000)
    .default('a', packageConfig.DB_PORT || 8001)
    .default('d', packageConfig.DELAY || 500)
    .argv;
var jsonServer = require('json-server');

/* re-implementation of connect-pause for handling delay of 0 */
var pause = function(delay, err) {
    delay = delay || 0; // original is 1000

    return function(req, res, next) {
        setTimeout(next, delay, err);
    };
};

var PORT = argv.p;
var DB_PORT = argv.a;
var DELAY = argv.d;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
  historyApiFallback: true,
}).listen(PORT, '0.0.0.0', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log(`Server started at http://localhost:${PORT}/`);
  console.log(`Tunnel started at http://${ip.address()}:${PORT}/`);

  jsonServer.create()
      .use(jsonServer.defaults())
      .use(pause(DELAY))
      .use(jsonServer.router('db.json'))
      .listen(DB_PORT, function(err) {
          if (err) {
              return console.log(err);
          }

          console.log(`Fake api server opened at port ${DB_PORT}`);
      })
});
