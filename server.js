var connect = require('connect');
connect().use(connect.static(__dirname)).listen(1333);