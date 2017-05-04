var http = require('http'),
	fs = require('fs');


var server = http.createServer();
server.listen(8080, function() {
	console.log('Listening for port 8080...');
});

server.getdata = function(response) {
	var readStream = fs.createReadStream('bsptext.txt', {encoding: 'utf8'});
	readStream.pipe(response);
};

server.on('request', function (request, response) {
	if (request.url === '/gettxt') {
		response.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
		server.getdata(response);
	} else {
		response.writeHead(200, {});
		response.end('Welcome to Nodejs Server');	
	}
});