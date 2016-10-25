var http = require('http');
var fs = require('fs');

var server = http.createServer();
server.on('request', function (request, response) {
	if (request.method === 'GET' && request.url === '/echo') {
		response.statusCode = 200;
		response.write('Success');
	} else if(request.method === 'GET' && request.url === '/package') {
		response.statusCode = 200;
		response.setHeader('Content-Type', 'application/json');
		response.write(fs.readFileSync(__dirname + '/../package.json'));
	}
	else {
		response.statusCode = 404;
	}
	response.end();
});

module.exports = server;