var http = require('http');
var fs = require('fs');

http.createServer((request, response) =>{
	var url = request.url;

	switch(url){

		case '/' :
			getStaticFileContent(response,'home.html','text/html');
			break;
		case '/about' :
			getStaticFileContent(response,'about.html','text/html');
			break;
		case '/contact' :
			getStaticFileContent(response, 'contact.html','text/html');
			break;
		default	:
			response.writeHead(404, {'Content-Type':'text/plain'});
			response.end('404 - Page not found');
	}

}).listen(3000);

console.log('server is running');

function getStaticFileContent(response, filePath, contentType) {
	fs.readFile(filePath, (error, data) => {
		if (error) {
			response.writeHead(500,{'Content-Type':'text/plain'});
			response.end('500 - Internal server error');
		}
		if (data) {
			response.writeHead(200,{'Content-Type':'text/html'});
			response.end(data);
		}
	});
}