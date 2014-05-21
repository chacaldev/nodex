var formidable = require("formidable");
var http = require("http");
var sys = require("sys");

function start(route, handle){
	function onRequest(request, response){
		if(request.url == '/upload' && request.method.toLowerCase() == 'post'){
			var form = new formidable.IncomingForm();
			form.parse(request, function(error, fields, files){
				response.writeHead(200, {"Content-Type":"text/plain"});
				response.write('Received upload:\n\n');
				response.end(sys.inspect({fields:fields, files:files}));
			});
			return;
		}

		
		response.writeHead(200, {"content-type":"text/html"});
		response.end(
			'<form action="/upload" enctype="multipart/form-data" '+
			'method="post">' +
			'<input type="text" name="title"><br>' +
			'<input type="file" name="upload" multiple="multiple"><br>' +
			'<input type="submit" value="Upload">' +
			'</form>');
	}
	
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;
