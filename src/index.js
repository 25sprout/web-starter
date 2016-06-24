const req = require.context('./entries/', true, /\.js$/);
req.keys().forEach(req);
