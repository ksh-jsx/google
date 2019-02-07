var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();


app.get('/',function(request,response){
	fs.readFile('include/html/Main.html',function(err,data){
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.end(data);
	});
});
app.use(express.static('include'));
app.listen(3000);
