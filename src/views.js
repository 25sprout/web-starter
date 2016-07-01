const req = require.context('./views/', true, /\.ejs$/);
req.keys().forEach(req);

require('./favicon.ico');
