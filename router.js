function route(handle, pathname, response, postData){
	console.log("About to route a request for " + pathname);
	if(typeof handle[pathname] === 'function'){
		return handle[pathname](response, postData);
	} else{
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type":"text/html"});
		response.write("404 not found");
		response.end();
	}
}

exports.route = route;
