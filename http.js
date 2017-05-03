var http = require('http');

var server = http.createServer();
server.listen(8080, function() {
	console.log('Listening for port 8080...');
});


function showWelcomePage(request, response) {
	var html = '<!DOCTYPE html><html><head><title>'
			+ 'NodeServer - 200 OK</title></head><body><h3>'
			+ 'Wilkommen zu Node Server</h3></body></html>';
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.end(html);
}

/*server.on('request', function (request, response) {
	showWelcomePage(request, response);
});*/


function showRequestHeaders(request, response) {
	var json = JSON.stringify(request.headers, null, 4);
	console.log(json);
	response.writeHead(200, {'Content-Type': 'application/json'});
	response.end(json);
}

function showNotFoundPage(request, response) {
	var html = '<!DOCTYPE html><html><hefunction showErrorPage(err, response) {
	var html = '<!DOCTYPE html><html><head><title>'
			+ 'NodeServer - 505 Server Error</title></head><body><h3>'
			+ '500 Server Error</h3>'
			+' <p><strong> Error Message: </strong>'+ err + '</p></body></html>';
		response.writeHead(500, {'Content-Type': 'text/html'});
		response.end(html);
}ad><title>'
			+ 'NodeServer - 404 Not Found</title></head><body><h3>'
			+ '404 Not Found</h3></body></html>';
		response.writeHead(404, {'Content-Type': 'text/html'});
		response.end(html);
}



server.on('request', function (request, response) {
	console.log('request.url: ' + request.url);

	if (request.method === 'GET') {
		if (request.url === '/') {
			showWelcomePage(request, response);
		} else if (request.url === '/requestheaders') {
			showRequestHeaders(request, response);
		} else if (request.url === '/errorpage') {
			var errmsg = 'Ein Server-Fehler ist aufgetreten.';
			showErrorPage(errmsg, response);
			server.emit('error', new Error(errmsg));
		} else {
			showNotFoundPage(request, response);
		}
	} else {
		showNotFoundPage(request, response);
	}
});

server.on('error', (err) => {
	console.log(err);
});
